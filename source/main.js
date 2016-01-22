import isEqual from 'is-equal'
import isPlainObject from 'is-plain-object'


function diffPrimitives (source, target) {
	if (!isEqual(source, target)) {
		return target
	}
	else {
		return undefined
	}
}

function diffArray (source, target) {
	const diff = []

	// Equalize array length
	if (source.length > target.length) {
		target.length = source.length
	}
	else {
		source.length = target.length
	}

	source.forEach((element, index) => {
		if (isEqual(element, target[index])) {
			diff[index] = null
		}
		else {
			diff[index] = createDiff(element, target[index])
		}
	})

	return diff
}

function diffObject (source, target) {
	const diff = {}

	for (let key in source) {
		diff[key] = createDiff(source[key], target[key])
	}

	return diff
}

export default function createDiff (source, target) {

	if (Array.isArray(source)) {
		return diffArray(source, target)
	}
	else if (isPlainObject(source)) {
		return diffObject(source, target)
	}
	else {
		return diffPrimitives(source, target)
	}
}
