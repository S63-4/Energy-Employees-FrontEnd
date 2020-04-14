import Broker from 'typescript-rabbitmq';

declare const process;

let config: any = {
  connection: {
    user: process.env.QUEUE_USERNAME,
    pass: process.env.QUEUE_PASSWORD,
    host: process.env.QUEUE_SERVER || 'localhost',
    port: process.env.QUEUE_PORT || '5672',
    timeout: 2000,
    name: "rabbitmq"
  },
  exchanges: [
    {name: "work.tasks.exchange", type: "topic", options: {publishTimeout: 1000, persistent: true, durable: false}},
    {name: "work.reply.exchange", type: "topic", options: {publishTimeout: 1000, persistent: true, durable: false}}
  ],
  queues: [
    {name: "work.tasks.queue", options: {limit: 1000, queueLimit: 1000}},
    {name: "work.reply.queue", options: {limit: 1000, queueLimit: 1000}}
  ],
  binding: [
    {exchange: "work.tasks.exchange", target: "work.tasks.queue", keys: "loopback.#"},
    {exchange: "work.reply.exchange", target: "work.reply.queue", keys: "tsemach.#"}
  ],
  logging: {
    adapters: {
      stdOut: {
        level: 3,
        bailIfDebug: true
      }
    }
  }
};

class Receiver {
  broker: Broker;
  ison: boolean;

  constructor() {
    this.ison = false;
    this.broker = new Broker(config);
  }

  async init() {
    await this.broker.connect();

    this.broker.addConsume("work.tasks.queue", this.taskCB.bind(this));
    this.broker.addConsume("work.reply.queue", this.replyCB.bind(this));

    return this;
  }

  receive(ison) {
    this.ison = ison;
  }

  taskCB(msg) {
    if ( ! this.ison ) { return }

    msg.content = {data: "string", content: msg.content.toString()};
    console.log("taskCB: [%s]: taskCB %s:'%s'",
      msg.properties.headers.messageId,
      msg.fields.routingKey,
      msg.content.toString());
    console.log("taskCB: [%s] msg = %s", msg.properties.headers.messageId, JSON.stringify(msg, undefined, 2));
    console.log("");
  }

  replyCB(msg) {
    if ( ! this.ison ) { return }

    msg.content = {data: "string", content: msg.content.toString()};
    console.log("replyCB: [%s]: replyCB %s:'%s'",
      msg.properties.headers.messageId,
      msg.fields.routingKey,
      msg.content.toString());
    console.log("replyCB: [%s] msg = %s", msg.properties.headers.messageId, JSON.stringify(msg, undefined, 2));
    console.log("");
  }
}

async function run() {
  console.log("going to start receiver test");
  let receiver = new Receiver();
  await receiver.init();
  receiver.receive(true);
}

run();
