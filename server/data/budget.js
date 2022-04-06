const mongoCollections = require('../config/mongoCollections');
//const albums = mongoCollections.albums;
const Bands = mongoCollections.bands;
const bands = require('./bands');
const errorChecking = require('../errorChecking');
const { ObjectId } = require('mongodb');
//const uuid = require('uuid/v4');

const create = async (bandId, title, releaseDate, tracks, rating) => {
	//If bandId, title, releaseDate, tracks, rating are not provided at all, the method should throw. (All fields need to have valid values);
	//If bandId, title, releaseDate are not strings or are empty strings, the method should throw
	//If the bandId  provided is not a valid ObjectId, the method should throw
	//If the band  doesn't exist with that bandId, the method should throw
	//If tracks is not an array and if it does not have at least 3 elements in the array that is are valid strings, or are empty strings the method should throw. (all elements must be strings as well, but there must be AT LEAST 3)
	//If releaseDate is not a valid date string, the method will throw.
	//If releaseDate is < 1900 or is > the current year + one year, the method should throw.
	//If rating is not a number from 1 to 5, the method will throw. (floats will be accepted as long as they are in the range 1.5 or 4.8 for example. We will only use one decimal place)

	try {
		await errorChecking.errorCreateAlbum(
			bandId,
			title,
			releaseDate,
			tracks,
			rating
		);
	} catch (e) {
		throw e;
	}

	/*Logic to trim and insert ----------------*/
	for (i in tracks) {
		tracks[i] = tracks[i].trim();
	}

	title = title.trim();
	releaseDate = releaseDate.trim();

	//let albumCollection = await albums();
	let bandsCollection = await Bands();

	let album = {
		_id: ObjectId(),
		title: title,
		releaseDate: releaseDate,
		tracks: tracks,
		rating: rating,
	};

	const data = await bandsCollection.updateOne(
		{ _id: ObjectId(bandId) },
		{ $addToSet: { albums: album } }
	);

	if (!data.acknowledged || data.modifiedCount === 0)
		throw {
			code: 400,
			message: 'could not add album to band',
		};

	//	const dataId = data.insertedId.toString();

	//overall rating
	let bandData = await bands.get(bandId);
	let overallR = 0;
	bandData.albums.forEach((e) => {
		overallR = overallR + e.rating;
	});

	const data2 = await bandsCollection.updateOne(
		{ _id: ObjectId(bandId) },
		{ $set: { overallRating: overallR } }
	);

	if (!data2.acknowledged || data2.modifiedCount === 0)
		throw {
			code: 400,
			message: 'could not update Overall Rating',
		};

	let insertedalbum = await get(album._id.toString());
	insertedalbum._id = insertedalbum._id.toString();
	return insertedalbum;
};
const getAll = async (bandId) => {
	let band = undefined;
	try {
		band = await bands.get(bandId);
	} catch (e) {
		throw e;
	}

	let allAlbums = band.albums;
	if (!allAlbums) throw { code: 404, message: 'No Albums in this band' };
	if (allAlbums && allAlbums.length > 0) {
		for (i in allAlbums) {
			allAlbums[i]._id = allAlbums[i]._id.toString();
		}
	}

	return allAlbums;
	//return 'done with getAll albums';
};
const get = async (albumId) => {
	if (!albumId) throw 'Please provide a valid Album ID';
	if (typeof albumId !== 'string') throw 'Enter Album ID in string format';
	if (albumId.trim().length === 0)
		throw 'Album ID cannot be blank. Please enter a String';
	albumId = albumId.trim();
	if (!ObjectId.isValid(albumId)) throw 'Invalid object ID';

	let band = await Bands();
	/** Logic to find album from band with looops */
	// const bandData = await band.findOne({ 'albums._id': ObjectId(albumId) });
	// let finalAlbum = {};
	// temp = bandData.albums;

	// for (i in temp) {
	// 	if (temp[i]._id.toString() === albumId) {
	// 		finalAlbum = temp[i];
	// 	}
	// }

	/** Logic to find album with out loops */

	const bandData2 = await band.findOne(
		{ 'albums._id': ObjectId(albumId) },
		{
			projection: {
				_id: 0,
				albums: 1,
				// '_albums._id': 1,
				// 'albums.title': 1,
				// 'albums.releaseDate': 1,
				// 'albums.tracks': 1,
				// 'albums.rating': 1,
			},
		}
	);
	if (bandData2 === null) {
		throw ' No Such album id exists';
	} else {
		temp = bandData2.albums;

		for (i in temp) {
			if (temp[i]._id.toString() === albumId) {
				finalAlbum = temp[i];
			}
		}
		//	let bandData3 = await bandData2.toArray();
		//console.log(bandData2);

		finalAlbum._id = finalAlbum._id.toString();
		return finalAlbum;
		//return bandData2;
	}
};

const remove = async (albumId) => {
	try {
		errorChecking.errorGetAlbumId(albumId);
	} catch (e) {
		throw e;
	}

	let Bandid = await getBandId(albumId);
	//console.log('Album ID iS::::' + albumId);
	//console.log('Band ID iS::::' + Bandid);
	let bandsCollection = await Bands();

	const data = await bandsCollection.updateOne(
		{ _id: ObjectId(Bandid) },
		{ $pull: { albums: { _id: ObjectId(albumId) } } }
	);
	if (!data.matchedCount && !data.modifiedCount)
		throw {
			code: 400,
			message: 'Update failed',
		};
	else {
		let bandData = await bands.get(Bandid);
		let overallR = 0;
		bandData.albums.forEach((e) => {
			overallR = overallR + e.rating;
		});

		const data2 = await bandsCollection.updateOne(
			{ _id: ObjectId(Bandid) },
			{ $set: { overallRating: overallR } }
		);

		if (!data2.acknowledged || data2.modifiedCount === 0)
			throw {
				code: 400,
				message: 'could not update Overall Rating',
			};

		// let insertedalbum = await get(album._id.toString());
		// insertedalbum._id = insertedalbum._id.toString();
		// return insertedalbum;

		let updatedBand = bands.get(Bandid);
		return updatedBand;
	}
};

const getBandId = async (albumId) => {
	try {
		await errorChecking.errorGetAlbumId(albumId);
	} catch (e) {
		throw e;
	}
	albumId = albumId.trim();

	let band = await Bands();

	const bandData2 = await band.findOne({ 'albums._id': ObjectId(albumId) });
	if (bandData2 === null) {
		throw ' No Such album id exists';
	} else {
		let temp = bandData2._id;
		let bandId = temp.toString();
		//	console.log(bandId);
		return bandId;
	}
};

module.exports = {
	create,
	getAll,
	get,
	remove,
	getBandId,
};
