import * as utils from './utils';



const field_metadata_symbol = Symbol();

export const field = utils.optionalParamsDecorator(descriptor => {
	if(descriptor.kind != 'field')
		throw new Error();

	descriptor.finisher = constructor => {
		if(!constructor[field_metadata_symbol])
			constructor[field_metadata_symbol] = {
				fields: []
			};

		constructor[field_metadata_symbol].fields.push({
			key: descriptor.key,
			placement: descriptor.placement,
		})
	};
});



export const constructor = utils.optionalParamsDecorator(descriptor => {
	if(descriptor.kind != 'class')
		throw new Error();
	// TODO
});



export const typeOf = utils.optionalParamsDecorator((descriptor, args) => {
	if(descriptor.kind != 'class')
		throw new Error();
	const typeOfValue = args.length ? args[0] : 'undefined'; // TODO get the constructor name
	const typeofGetter = utils.createGetter(Symbol.toStringTag, () => typeOfValue);
	descriptor.elements.push(typeofGetter);
});



export const serializable = utils.optionalParamsDecorator((descriptor, args) => {
	// TODO add support for recursive serialization
	const keys = [...args];

	descriptor.elements.push(
		utils.createStaticMethod('from', function(obj = {}){
			const constructor_args = keys.map(k => obj[k]);
			return Reflect.construct(this, constructor_args);
		})
	);
});



export const logDescriptor = utils.optionalParamsDecorator(descriptor => console.log(descriptor));