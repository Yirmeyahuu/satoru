import type { DocumentListItem } from './types';

type DocumentUpdateCallback = (document: DocumentListItem) => void;

class WebSocketService {
  private ws: WebSocket | null = null;
  private callbacks: Set<DocumentUpdateCallback> = new Set();
  private reconnectTimeout: ReturnType<typeof setTimeout> | null = null;  // Change this line
  private userId: number | null = null;

  private getWebSocketUrl(userId: number): string {
    // Get API URL from environment or default to localhost
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    
    // Convert http(s) to ws(s)
    const wsProtocol = apiUrl.startsWith('https') ? 'wss' : 'ws';
    const wsHost = apiUrl.replace(/^https?:\/\//, '');
    
    return `${wsProtocol}://${wsHost}/ws/documents/?user_id=${userId}`;
  }

  connect(userId: number) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      console.log('WebSocket already connected');
      return;
    }

    this.userId = userId;
    const wsUrl = this.getWebSocketUrl(userId);
    
    console.log(`Connecting to WebSocket: ${wsUrl}`);

    try {
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        console.log('✓ WebSocket connected successfully');
        if (this.reconnectTimeout) {
          clearTimeout(this.reconnectTimeout);
          this.reconnectTimeout = null;
        }
      };

      this.ws.onmessage = (event) => {
        try {
          console.log('WebSocket message received:', event.data);
          const data = JSON.parse(event.data);
          if (data.type === 'document_update' && data.document) {
            console.log('Document update received:', data.document);
            this.callbacks.forEach(callback => callback(data.document));
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      this.ws.onclose = (event) => {
        console.log(`WebSocket disconnected. Code: ${event.code}, Reason: ${event.reason}`);
        this.ws = null;
        
        // Attempt to reconnect after 3 seconds
        if (this.userId) {
          console.log('Scheduling reconnection in 3 seconds...');
          this.reconnectTimeout = setTimeout(() => {
            console.log('Attempting to reconnect WebSocket...');
            this.connect(this.userId!);
          }, 3000);
        }
      };
    } catch (error) {
      console.error('Error creating WebSocket:', error);
    }
  }

  disconnect() {
    console.log('Disconnecting WebSocket...');
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }

    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }

    this.userId = null;
    this.callbacks.clear();
  }

  onDocumentUpdate(callback: DocumentUpdateCallback) {
    console.log('Registered document update callback');
    this.callbacks.add(callback);
    
    // Return cleanup function
    return () => {
      console.log('Unregistered document update callback');
      this.callbacks.delete(callback);
    };
  }
}

export const websocketService = new WebSocketService();