import prisma from "./Client/db";
import kafka from "./producer/producer";

const AddToQueue = async()=>{
  try{
    const producer = kafka.producer()
    producer.connect().then((resp)=>{
       console.log("Producer Connected to kafka");
      setTimeout(()=>{
       prisma.$transaction(async tx=>{
           const Zaps = tx.zapRunOutBox.findMany(); 
           
           (await Zaps).map(async zap=>{
            console.log(zap)
               await producer.send({
                   topic: 'ProcessQueue',
                   messages: [
                     { value: zap.MetaData?.toString() ?? "" },
                   ],
                 })
           })
           tx.zapRunOutBox.deleteMany();
           })
      },2000)
    })
  }
  catch(err){
   console.log(err);
  }
}
AddToQueue();
