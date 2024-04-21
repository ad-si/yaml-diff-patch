import isEqual from 'is-equal'
import isPlainObject from 'is-plain-object'


function patchArray (source, diff) {
	const target = []

	// Equalize array length
	if (source.length > target.length) {
		target.length = source.length
	}
	else {
		source.length = target.length
	}

	diff.forEach((element, index) => {
		if (!isEqual(element, source[index])) {
			if (element !== null)
				target[index] = applyDiff(source[index], element)
			else
				target[index] = source[index]
		}
	})

	return target
}

function patchObject (source, diff) {
	const target = {}

	for (let key in diff) {
		target[key] = applyDiff(source[key], diff[key])
	}

	return target
}


export default function applyDiff (source, diff) {

	if (Array.isArray(diff)) {
		return patchArray(source, diff)
	}
	else if (isPlainObject(diff)) {
		return patchObject(source, diff)
	}
	else {
		return diff
	}
}
