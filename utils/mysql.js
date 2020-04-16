const mysql = require('mysql');
const config = require('config');

const dbConfig = config.get("sql_db");

console.log('INITIALIZE POOL###################################');


let poolObj = {};

for (const connection in dbConfig) {

	poolObj[connection] = {
		connection,
		pool: mysql.createPool(dbConfig[connection]),
	}
}

class MySQL {

	constructor(connectionName = 'read') {

		this.pool = poolObj[connectionName || 'read'] || poolObj['read'];
	}

	async query(sql, values = null, connectionName = "read") {

		if (!poolObj[connectionName]) {

			throw(new Error('Connection not found'));
		}

		if (!poolObj[connectionName].pool) {

			poolObj[connectionName].pool = mysql.createPool(poolObj[connectionName].connection);
		}

		this.pool = poolObj[connectionName].pool;

		return new Promise((resolve, reject) => {

			const q = this.pool.query(sql, values, function (err, result) {

				if (err) {
					console.log(err);

					return reject(err);
				}

				if (!result.hasOwnProperty('length')) {
					return resolve(result);
				}

				this.formatted_sql = q.sql;
				this.sql = q.sql.replace(/\n/g, ' ');
				this.result = result;
				result.instance = this;
				return resolve(result);
			});
		});
	}
}

// (async () => await MySQL.crateExternalPool())();

exports.MySQL = (() => new MySQL)();
exports.crateExternalPool = MySQL.crateExternalPool;