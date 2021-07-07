
exports.pages = async function(client, message, pages, timeout, disbut, style, forwardButtonEmoji, backButtonEmoji, deleteEmbedEmoji){
    const Discord = require("discord.js");
    require("discord-buttons");
    var timeForStart = Date.now();
    const pageMovingButtons1 = new disbut.MessageButton()
    .setID(`forward_button_embed`)
    .setLabel("")
    .setEmoji(forwardButtonEmoji)
    .setStyle(style)
    const pageMovingButtons2 = new disbut.MessageButton()
    .setID(`back_button_embed`)
    .setLabel("")
    .setEmoji(backButtonEmoji)
    .setStyle(style)
    var pageMovingButtons = new disbut.MessageActionRow()
    .addComponent(pageMovingButtons2)
    if(deleteEmbedEmoji){
    const deleteEmbedButton = new disbut.MessageButton()
    .setID("delete_button_embed")
    .setLabel("")
    .setEmoji(deleteEmbedEmoji)
    .setStyle(style)
    pageMovingButtons.addComponent(deleteEmbedButton)
    }
    pageMovingButtons.addComponent(pageMovingButtons1)
    var currentPage = 0;
    var m = await message.channel.send({components: [pageMovingButtons], embed: pages[0]});
    client.on("clickButton", async b=>{
        if(Date.now() - timeForStart >= timeout)return;
        if(b.message.id == m.id && b.clicker.user.id == message.author.id){
        if(b.id == "back_button_embed"){
            if(currentPage - 1 < 0){
                currentPage = pages.length - 1
            } else{
                currentPage -= 1;
            }
        } else if(b.id == "forward_button_embed"){
            if(currentPage + 1 == pages.length){
                currentPage = 0;
            } else{
                currentPage += 1;
            }
        } else if(b.id == "delete_button_embed"){
            try{
                m.delete();
            } catch (err){
                console.log(err)
            }
        }
        if(b.id == "back_button_embed" || b.id == "forward_button_embed"){
            m.edit({embed: pages[currentPage], components: [pageMovingButtons]});
            b.reply.defer(true);
        }
    }
    })
}