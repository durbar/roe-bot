const mysql = require("./mysql").MySQL;

class Message {

    static async setMessage(messageObject, command) {

        let user = "0", message = "";

        if (messageObject.author && messageObject.author.id) {
            user = messageObject.author.id;
        }

        if(messageObject.content) {
            message = messageObject.content.replace(command, '');
        }

        return await mysql.query(`INSERT INTO messages (user_id, message) VALUES (?, ?)`, [user, message]);
    }

    static async getMessage(count, string) {

        const messages = await mysql.query(`
            SELECT 
                message,
                COUNT(*) AS count,
                MAX(id) AS idx
            FROM
                messages
            WHERE 
                message like ?
            GROUP BY
                message
            ORDER BY idx DESC LIMIT ${count}`,
            [`%${string.replace(/%/g, "\\%").replace(/_/g, "\\_")}%`]
        );

        if(!messages.length) {

            return `No recent message for ${string} found`;
        }

        return "\n" + messages.map(x => `${x.message}   ${x.count > 1 ? `[${x.count}]` : ""}`).join("\n");
    }
}

module.exports = Message;