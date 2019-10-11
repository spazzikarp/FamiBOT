
/* eslint-disable no-unused-expressions */
/* eslint-disable strict */
const uuidv1 = require('uuid/v1');

const badger = [
  'Badgers? Honey badgers are the best',
  'I love honey badgers',
  'badger badger badger snek! Snek!',
  'Capt Badger reporting for snek!',
  'Honey badgers are my fav',
  `Honey badger! Not only is its skin tough, it's loose enough that a honey badger can turn around in it and bite its 
   attacker. And speaking of bites, the honey badger can survive the bites of some very dangerous creatures. 
   They eat scorpions and snakes, and they have an unusually strong immunity to venom.`,
  'Honey badgers get their name from their penchant for raiding beehives',
  `Honey Badgers have many reasons to be fearless. They have very thick (about 1/4 inches), rubbery skin, 
   which is so tough that it's been shown to be nearly impervious to traditionally made arrows and spears`,
  'Badgers!, they are great.',
  `While the American badger is an aggressive animal with few natural enemies it is still vulnerable to other species
   in its habitat. Badgers are hostile. Predation on smaller individuals by golden eagles (Aquila chrysaetos), coyotes,
   cougars (Puma concolor), and bobcats (Lynx rufus) have been reported`,
  'honey badgers can live to 24',
  `The Mustelidae (/ˌmʌˈstɛlɪdi/; from Latin mustela, weasel) are a family of carnivorous mammals, including weasels, 
   BADGERS, otters, ferrets, martens, minks, and wolverines, among others. Mustelids (/ˈmʌstəlɪd/) are a diverse group
   and form the largest family in the order Carnivora, suborder Caniformia`,
  `The honey badger (Mellivora capensis), also known as the ratel (/ˈreɪtəl/ or /ˈrɑːtəl/), is a mammal widely
   distributed in Africa, Southwest Asia, and the Indian subcontinent. The Guniess book of awesome defines them as
   completely the most awesome critter ever to terrorize everything. They are wicked.`,
  'badgers? Why always badgers? I love them, but really?'
];

module.exports = (robot) => {
  // badger badger badger
  robot.hear(/badger/i, (msg) => {
    const rand = Math.round(Math.random() * 600000);
    const totalBadgers = robot.brain.get('totalBadgers') + 1;
    robot.brain.set('totalBadgers', totalBadgers);
    setTimeout(() => {
      msg.send(msg.random(badger));
    }, rand);
    const user = msg.message.user;
    robot.logger.info(`${user.name} was heard saying ${msg.message.text} for the ${totalBadgers} time`);
  });

  robot.hear(/how many badgers\?/i, (msg) => {
    const totalBadgers = robot.brain.get('totalBadgers');
    msg.send(`The total number of badger messages is ${totalBadgers}`);
    const user = msg.message.user;
    robot.logger.info(`${user.name} was heard saying ${msg.message.text} for the ${totalBadgers} time`);
  });

  // agree with awesome
  robot.hear(/^(.*) (is|are|seems) awesome/i, (msg) => {
    const rand = Math.round(Math.random() * 120000);
    const user = msg.message.user;
    setTimeout(() => {
      msg.send(`After careful consideration, I think that ${msg.match[1]} ${msg.match[2]} awesome too`);
    }, rand);
    robot.logger.info(`${user.name} was heard saying ${msg.message.text}`);
  });

  robot.hear(/^catbomb (d+) (.*)/i, (msg) => {
    const user = msg.message.user;
    for (let i = 0; i < msg.match[1]; i++) {
      if (msg.match[2]) {
        msg.send(`https://cataas.com/cat/says/${msg.match[2]}`);
      } else {
        msg.send(`https://cataas.com/cat/gif?${uuidv1()}`);
      }
    }
    robot.logger.info(`${user.name} catbombed ${msg.message.text}`);
  });

  robot.hear(/^catbomb info/i, (msg) => {
    const user = msg.message.user;
    msg.send(`
      Usage: catbomb <number> <optional saying>
      Info: Gets cats from https://cataas.com/cat/gif and meow bombs the chan.
      If there is a saying then uses static images with text on them.
      If not then it returns gifs ftw.
      Submit meow cats https://cataas.com
      Enjoy
    `);
    robot.logger.info(`${user.name} catbomb info ${msg.message.text}`);
  });

  // point out topic changes
  robot.topic((msg) => {
    msg.send(`${msg.message.text}? TOPIC CHANGE! I'm telling!`);
  });

  robot.router.post('/famibot/test/:message', (req, res) => {
    const room = req.params.room;
    const data = JSON.parse(req.body.payload);
    const secret = data.secret;
    robot.messageRoom('', `webhook /famibot/test/:message got ${data} with secret ${secret} for room ${room}`);
    res.send('OK');
  });

  robot.router.post('/famibot/scores/heroku/keepalive', (req, res) => {
    robot.logger.info(`got ping from ${req} sending pong`);
    res.send('PONG');
  });

  robot.router.get('/famibot/scores/heroku/keepalive', (req, res) => {
    robot.logger.info(`got ping from ${req} sending pong`);
    res.send('PONG');
  });

  // error handling
  robot.error((err, msg) => {
    msg.send('I experienced an error. Someone should investigate');
    robot.logger.error(`DOES NOT COMPUTE. Got ${err} for ${msg.message.text}`);
  });
};
