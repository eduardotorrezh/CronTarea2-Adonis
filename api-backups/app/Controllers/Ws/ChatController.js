'use strict'
const exec = require('child_process').exec
const Setting = use('App/Models/Setting')

//var Push = require('push.js')
class ChatController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
    
  }
  onMessage (message) {
  this.socket.broadcastToAll('message', message)
 console.log("Esto dijo el server al cliente") 
  console.log("Ya casi estalolololo")
  this.show(message)

}
 async show(message){
 let setting = await Setting.findOrFail(message)
 console.log(setting.userBd);
 let a = setting.userBd+" "+setting.passwordBd+" "+setting.nameBd+" "+setting.ip+" "+setting.port
 console.log("Concatenado es = "+a)
 //console.log('mysqldump' + ' --user='+ setting.$originalAttributes.userBd + ' --password='+setting.$originalAttributes.passwordBd+ ' -h 127.0.0.1 ' + setting.$originalAttributes.nameBd+ ' > ' + 'C:/Users/Jorge Julian Sanchez/Documents/respaldos/'+setting.$originalAttributes.name+'.sql')
 exec('echo "#'+setting.$originalAttributes.descripcionBd+' = Descripcion del crontab de abajo" >> /home/martin/mycrontab')
 exec('echo "'+a+' python /home/martin/correo.py" >> /home/martin/mycrontab')
 exec('crontab /home/martin/mycrontab')
console.log("Simon se aplica")

}
}

module.exports = ChatController