from channels.generic.websocket import AsyncWebsocketConsumer
import json

class PostConsumer(AsyncWebsocketConsumer):
    group_name = "posts"

    async def connect(self):
        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()
        await self.send(text_data=json.dumps({"message": "Connected to posts group!"}))
        print("WebSocket connected")

    async def disconnect(self, close_code):
        # Remove from the group on disconnect
        await self.channel_layer.group_discard(self.group_name, self.channel_name)
        print("WebSocket disconnected")

    async def receive(self, text_data):
        data = json.loads(text_data)
        message = data.get("message", "")

        print("Received from client:", message)

        # Broadcast message to all members of the group
        await self.channel_layer.group_send(
            self.group_name,
            {
                "type": "chat.message",  # type is the name of the handler
                "message": message,
            }
        )

    # This handles messages sent to the group
    async def chat_message(self, event):
        message = event["message"]
        await self.send(text_data=json.dumps({"message": message}))


"""class PostConsumer(AsyncWebsocketConsumer):
    
    async def connect(self):
        self.group_name = "posts"
        await self.channel_layer.group_add("posts", self.channel_name)
        await self.accept()
    
    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("posts", self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        message = data.get("message", "")
        
        await self.channel_layer.group_send(
            self.group_name,
            {
                "type": "post_message",
                "message": message,
            }
        )

    async def post_message(self, event):
        message = event["message"]
        
        await self.send(text_data=json.dumps({
            "message": message,
        }))
"""