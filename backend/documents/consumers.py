import json
from channels.generic.websocket import AsyncWebsocketConsumer


class DocumentConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Get user from query string (since we can't use headers in WebSocket)
        query_string = self.scope.get('query_string', b'').decode()
        params = dict(qc.split('=') for qc in query_string.split('&') if '=' in qc)
        user_id = params.get('user_id')
        
        if not user_id:
            await self.close()
            return
        
        self.user_id = user_id
        self.room_group_name = f'user_{user_id}'
        
        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        
        await self.accept()
        print(f"WebSocket connected for user {user_id}")
    
    async def disconnect(self, close_code):
        # Leave room group
        if hasattr(self, 'room_group_name'):
            await self.channel_layer.group_discard(
                self.room_group_name,
                self.channel_name
            )
            print(f"WebSocket disconnected for user {self.user_id}")
    
    # Receive message from WebSocket
    async def receive(self, text_data):
        pass  # We don't need to receive messages from client
    
    # Receive message from room group
    async def document_update(self, event):
        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'type': 'document_update',
            'document': event['document']
        }))