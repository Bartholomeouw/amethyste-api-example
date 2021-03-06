module.exports = class {
  /**
   * Constructor
   * @param {object} bot
   */
  constructor(bot) {
    this.bot = bot;
  }

  /**
   * Execute on event
   */
  async run() {
    this.bot.prefixes.push(`<@!${this.bot.user.id}>`, `<@${this.bot.user.id}>`);
    this.bot.log.info(`${this.bot.user.username} ready !`);
  }
};
