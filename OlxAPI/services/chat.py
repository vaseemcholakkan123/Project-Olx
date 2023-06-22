from django.contrib.auth import get_user_model
from channels.db import database_sync_to_async
from channels.consumer import AsyncConsumer
import json
from channels.db import database_sync_to_async

User = get_user_model()


class ChatUser(AsyncConsumer):



    async def websocket_connect(self, event):
        print("websocket connected",event)
        
        user = self.scope['user']
        self.chatroom = f'user_chatroom_{user.id}'

        await self.channel_layer.group_add(
            self.chatroom,
            self.channel_name
        )
        
        await self.send({"type": "websocket.accept"})






    async def websocket_receive(self, event):

        dmp = json.loads(event['text'])
        message = dmp.get('message')
        sender = dmp.get('sent_by')
        reciever = dmp.get('reciever')

        print('sent by ' , sender , 'recive to ' , reciever)

        sender = await self.get_user(sender)
        reciever = await self.get_user(reciever)

        if not message or not sender or not reciever:
            await self.send({"type": "websocket.send","text" : 'User fetch error'})

        reciever_chatroom = f'user_chatroom_{dmp.get("reciever")}'

        response = {
            'message':message,
            'sent_by':self.scope['user'].id,
            'sent_by_name':self.scope['user'].username
        }

        await self.channel_layer.group_send(
            reciever_chatroom,
            {
                'type':'chat_message',
                'text':json.dumps(response)
            }
        )

        await self.channel_layer.group_send(
            self.chatroom,
            {
                'type':'chat_message',
                'text':json.dumps(response)
            }
        )

        await self.send({"type": "websocket.send","text" : message})


    async def chat_message(self,event):
        print('messssss',event)
        await self.send({'type':'websocket.send','text':event['text']})




    async def websocket_disconnect(self, event):
        print("Connection closed")






    @database_sync_to_async
    def get_user(self,user_id):
        usr = User.objects.filter(id=user_id)
        if usr.exists():
            return usr.first()
        else:
            return None