

export function createPropertyDescriptor(configurable = true, enumerable = true, writable = true){
	return {
		configurable: configurable,
		enumerable: enumerable,
		writable: writable,
	};
}

export function createGetterPropertyDescriptor(getter){
	return {
		configurable: true,
		enumerable: false,
		get: getter
	}
}

export function createSetterPropertyDescriptor(setter){
	return {
		configurable: true,
		enumerable: false,
		set: setter
	}
}



export function createElementDescriptor(kind, placement, name, value, descriptor = createPropertyDescriptor()){
	const ed = {
		kind: kind,
		key: name,
		placement: placement,
		descriptor: descriptor
	};

	if(kind == 'method' && typeof value == 'function')
		ed.descriptor.value = value;

	if(value != undefined && typeof value != 'function')
		ed.initializer = function(){
			return value;
		};



	return ed;
}

export function createField(name, value){
	return createElementDescriptor('field', 'own', name, value, createPropertyDescriptor(true, true, true));
}

export function createStaticMethod(name, value){
	return createElementDescriptor('method', 'static', name, value, createPropertyDescriptor(true, false, true));
}

export function createMethod(name, value){
	return createElementDescriptor('method', 'prototype', name, value, createPropertyDescriptor(true, false, true));
}

export function createGetter(name, value){
	return createElementDescriptor('method', 'prototype', name, undefined, createGetterPropertyDescriptor(value));
}

export function createSetter(name, value){
	return createElementDescriptor('method', 'prototype', name, undefined, createSetterPropertyDescriptor(value));
}





export function getConstructorParamsNames(constructor){
	console.log(constructor);
	const match = /^.+\((.+)\s*,?\s*\)\s*{/i
		.exec(constructor);
	if(!match){
		return [];
	}
	return match[1]
		.split(',')
		.map(s => s.trim());
}


/**
 *
 * @param {Function} decorator_function A function that will receive a 'descriptor', and 'args' parameters
 * @returns {Function}
 */
export function optionalParamsDecorator(decorator_function){
	if(typeof decorator_function != 'function')
		throw new TypeError(`Invalid type of decorator function "${typeof decorator_function}"`);

	return function(){
		const args = arguments;
		if(args.length && args[0][Symbol.toStringTag] === 'Descriptor'){
			return decorator_function(args[0], []);
		} else{
			return function(descriptor){
				return decorator_function(descriptor, [...args]);
			}
		}
	}
}