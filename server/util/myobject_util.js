/**
 * 
 */
export  function trythis() {
    try {
        var str1={
            _id:'123',
            statename: 'Maharashtra',
            countryid:{
                _id:'456',
                countryname:'India2',
            },
            cityid:{
                _id:'789',
                cityname:'thane',
            }
        };
        var result={};

        Object.keys(str1).map(a=>{
            const b=str1[a];
            if(typeof b == 'object'){
                var temp3=templogic(b,a);
                result=Object.assign(result,temp3);
            }else{
                var d={};
                d[a]=b;
                result=Object.assign(result,d);
            }
        });
        return result;
    } catch (error2) {
      return {
        error: error2,
      };
    }
}

function templogic(obj1,titlekey){
    var result2={};
    Object.keys(obj1).map(c=>{
        if(c=='_id'){
            var d={};
            var key=titlekey+c;
            d[key]=obj1[c];
            result2=Object.assign(result2,d);
        }else{
            var d={};
            d[c]=obj1[c];
            result2=Object.assign(result2,d);
        }
    });
    return result2;
}
  