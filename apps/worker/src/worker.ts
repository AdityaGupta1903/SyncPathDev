import { Kafka } from "kafkajs"
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['kafka:9092'],
})
const ConsumeMessage = async () => {
  try {
    const consumer = kafka.consumer({ groupId: 'ProcessQueueGroup' })
    await consumer.connect()
    await consumer.subscribe({ topic: 'ProcessQueue', fromBeginning: true })
    const res = await consumer.run({
      autoCommit: false,
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          value: message.value?.toString(),
        })
        await consumer.commitOffsets([{ partition: partition, offset: message.offset, topic: 'ProcessQueue' }])
      },

    })
  }
  catch (err) {
    console.log(err);
  }
}
ConsumeMessage();