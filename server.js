var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var Sequelize = require('sequelize')

var app = express()

app.use(express.static(__dirname + '/app'))
app.use(cors())
app.use(bodyParser.json())

var sequelize = new Sequelize('users', 'root', '', {
	dialect: 'mysql',
	port: 3306
})

var Antrenor = sequelize.define('antrenor', {
	numeAntrenor: {
		type: Sequelize.STRING,
		validate: {
			len: [3, 100]
		},
		allowNull: false
	},
	varsta: {
		type: Sequelize.STRING,
		validate: {
			len: [1, 2]
		},
		allowNull: false
	},
	club: {
		type: Sequelize.STRING,
		validate: {
			len: [3, 50]
		},
		allowNull: false
	},
})

var Jucator = sequelize.define('jucator', {
	nume: {
		type: Sequelize.STRING,
		validate: {
			len: [3, 100]
		},
		allowNull: false
	},
	descriere: {
		type: Sequelize.STRING,
		validate: {
			len: [3, 50],
		},
		allowNull: false
	},
})

Antrenor.hasMany(Jucator, {
	foreignKey: 'antrenorId'
})
Jucator.belongsTo(Antrenor, {
	foreignKey: 'antrenorId'
})

app.get('/create', function(req, res) {
	sequelize
		.sync({
			force: true
		})
		.then(function() {
			res.status(201).send('created')
		})
		.catch(function(error) {
			console.warn(error)
			res.status(500).send('not created')
		})
})

app.get('/antrenori', function(req, res) {
	Antrenor
		.findAll({
			attributes: ['id', 'numeAntrenor', 'varsta', 'club']
		})
		.then(function(antrenori) {
			res.status(200).send(antrenori)
		})
		.catch(function(error) {
			console.warn(error)
			res.status(500).send('not created')
		})
})

app.get('/antrenori/:id', function(req, res) {
	var id = req.params.id
	Antrenor
		.find({
			where: {
				id: id
			},
			attributes: ['id', 'numeAntrenor', 'varsta', 'club']
		})
		.then(function(antrenor) {
			res.status(200).send(antrenor)
		})
		.catch(function(error) {
			console.warn(error)
			res.status(500).send('not created')
		})
})

app.post('/antrenori', function(req, res) {
	Antrenor
		.create(req.body)
		.then(function() {
			res.status(201).send('created')
		})
		.catch(function(error) {
			console.warn(error)
			res.status(500).send('not created')
		})
})

app.put('/antrenori/:id', function(req, res) {
	var id = req.params.id
	Antrenor
		.find({
			where: {
				id: id
			}
		})
		.then(function(antrenor) {
			return antrenor.updateAttributes(req.body)
		})
		.then(function() {
			res.status(201).send('updated')
		})
		.catch(function(error) {
			console.warn(error)
			res.status(500).send('not created')
		})
})

app.delete('/antrenori/:id', function(req, res) {
	var id = req.params.id
	Antrenor
		.find({
			where: {
				id: id
			}
		})
		.then(function(antrenor) {
			antrenor.destroy()
		})
		.then(function() {
			res.status(201).send('updated')
		})
		.catch(function(error) {
			console.warn(error)
			res.status(500).send('not created')
		})
})

app.get('/antrenori/:id/jucatori', function(req, res) {
	var id = req.params.id
	Antrenor
		.find({
			where: {
				id: id
			},
			include: [Jucator]
		})
		.then(function(antrenor) {
			return antrenor.getJucators()
		})
		.then(function(jucatori) {
			console.warn(jucatori)
			res.status(200).send(jucatori)
		})
		.catch(function(error) {
			console.warn(error)
			res.status(500).send('error')
		})
})

app.post('/antrenori/:id/jucatori', function(req, res) {
	var id = req.params.id
	Antrenor
		.find({
			where: {
				id: id
			}
		})
		.then(function(antrenor) {
			return Jucator.create({
				nume: req.body.nume,
				descriere: req.body.descriere,
				antrenorId: antrenor.id
			})
		})
		.then(function() {
			res.status(201).send('created')
		})
		.catch(function(error) {
			console.warn(error)
			res.status(500).send('error')
		})
})

app.put('/antrenori/:id/jucatori/:jucatorId', function(req, res) {
	var consId = req.params.jucatorId
	Jucator
		.find({
			where: {
				id: consId
			}
		})
		.then(function(jucator) {
			jucator.nume = req.body.nume
			jucator.descriere = req.body.descriere
			return jucator.save(['body', 'descriere'])
		})
		.then(function() {
			res.status(201).send('updated')
		})
		.catch(function(error) {
			console.warn(error)
			res.status(500).send('not created')
		})
})

app.delete('/antrenori/:id/jucatori/:jucatorId', function(req, res) {
	var consId = req.params.jucatorId
	Jucator
		.find({
			where: {
				id: consId
			}
		})
		.then(function(jucator) {
			jucator.destroy()
		})
		.then(function() {
			res.status(201).send('deleted')
		})
		.catch(function(error) {
			console.warn(error)
			res.status(500).send('not created')
		})
})

app.listen(8080)