const rulesEmbed = {
    color: 0xffffff,
    fields: [{
        name: 'YawaJS',
        value: 'Check out this awesome node.js framework we\'ve made\n\n' +
            'Description: A nODE.Js frAmEwORk fOr REst ApI sErVEr-sIdE-apPlIcaTiOnS. ThIs Is BuIlT oN tOP oF maYAJs uSIng tYpEsCrIPt TO taKe aDVAntaGE of StRoNgLy TyPE chECkiNg ANd MoDErn JavAsCRIpt fEaTUrEs. tYpEscRiPt ALso PrOvIDeS eAsY imPLeMEnTatIoN dEpeNDenCY inJEcTiOn aNd INveRSIoN of ConTROl (iOC) thAt MakEs UNit TEstInG MucH EAsIEr.\n\n' +
            'Github Repo: [YawaJS](https://github.com/yawajs/yawa)'
    },],
    image: {
        url: 'https://user-images.githubusercontent.com/6942408/67062617-65fd5380-f196-11e9-891c-843b7dfdcd59.png',
    },
};

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    message.channel.startTyping();
    message.channel.send({
        embed: rulesEmbed
    }).catch(console.error);
    message.channel.stopTyping();
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Users"
};

exports.help = {
    name: "yawa",
    category: "Projects",
    description: "A nODE.js FRaMewOrK fOR reST apI SErveR-sIdE-aPPliCAtIOns.",
    usage: "yawa"
};