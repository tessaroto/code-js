module.exports = {
	entity:{
		annotations: {
			"Comment":{
				params:{
					"text":{
						required: true	
					},
					"scope":{
						required: false
					}
				},
				onCreateContext: (context, params)=>{
					context.entity.comment = params.text;
				}
			}
		}
	},
	attribute: {
		types:["Int", "String", "Decimal"],
		annotations: {
			"Comment":{
				params:{
					"text":{
						required: true	
					},
					"scope":{
						required: true
					}
				}
			},
			"PK":{
				params:{
				},
				onCreateContext: (context, attribute, params)=>{
					context.attribute = attribute.name;
				}
			}
		}
	}
};