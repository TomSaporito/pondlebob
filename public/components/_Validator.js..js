/**
 * Created by root on 7/10/17.
 */

/*


** = mandatory

formState:  [Object]{

    valid:  [Boolean],  -- is the whole form valid? **
    touched:[Boolean],  -- has the form been touched by the user yet? **
    fields: [Object]{   -- all the fields in the form **

        [field name]: [Object]  -- one object per field{ **

            msgs:       [Array of Strings]  -- list of current error messages to display
            value:      [Any]       -- the value of the input **
            touched:    [Boolean]   -- has user touched this yet?
            disabled:   [Boolean]   -- is this disabled
            valid:      [Boolean]   -- is field valid
            validate:   [Boolean]   -- should we validate this field? **
            validation: [Object]{

                contains: [Object]{
                    test: [Regex]   -- example: /[0-9]/g (this tests for numbers)
                    msg: [String]   -- error message to display
                }
                maxLength: [Object]{
                    test: [Number]  -- max-length accepted
                    msg: [String]   -- error message to display
                }
                minLength: [Object]{
                    test [Number]   -- min-length accepted
                    msg: [String]   -- error message to display
                }
                matches: [Object]{
                    test: [String]  -- name to search for in formState
                    msg: [String]   -- error message to display

                }
                leads: [Object]{
                    test: [String]  -- name of the formState.fields[name] to test against
                }
                pattern: [Object]{
                    test: [Regex]   -- regex to test against
                    msg: [String]   -- error message to display
                }
                required: [Object]{
                    msg: [String]   -- error message to display (will check if value is false, undefined, null, or has a length of 0)
                }
            }
        }


    }

}


*/




export default class Validator{
    constructor(){

    }

    validateForm(formState){

        var invalidFields = [];// empty array to put invalid count into


        for (var key in formState.fields) {// check validity of each field

            if ( formState.fields.hasOwnProperty(key) ) {//make sure field is a custom key

              if (formState.fields[key].validate) {//do we need to validate this field?

                  !formState.fields[key].valid? invalidFields.push(false): null;//if not valid, add to arr
              }
            }
        }

        //console.log(invalidFields);

        if ( invalidFields.length > 0 ) {//any invalid fields?
            return false;
        } else {
            return true;
        }


    }

    validateField(val, name, formState, validateWholeForm) {

        var field = formState.fields[name];//get field
        var validation = field.validation;//get validation tests

        field.msgs = [];// empty array for error messages


        for (var key in validation) {// run all tests in validation object
            if (validation.hasOwnProperty(key)) {
                switch (key) {
                    case 'contains':
                        if (val) {
                            var res = val.match(validation.contains.test);

                            if (res) {
                                field.msgs.push(validation.contains.msg);// push message to msgs array
                            } else {

                            }
                        }
                        break;

                    case 'minLength':
                        if(val){
                            if (val.length < validation.minLength.test) {
                                field.msgs.push(validation.minLength.msg);
                            } else {
                            }
                        }
                        break;

                    case 'maxLength':
                        if(val){
                            if (val.length > validation.maxLength.test) {
                                field.msgs.push(validation.maxLength.msg);
                            } else {

                            }
                        }
                        break;
                    case 'matches':
                        if(val){
                            if(val === formState.fields[validation.matches.test].value){

                            } else {
                                field.msgs.push(validation.matches.msg);
                            }
                        }
                        break;
                    case 'required':
                        //console.log('VALUE: ', val);
                        if (!val || (val.length === 0) ) {
                            field.msgs.push(validation.required.msg);
                        }
                        break;
                    case 'pattern':
                        if(val){
                            if( validation.pattern.test.test(val) ) {
                            } else {
                                field.msgs.push(validation.pattern.msg)
                            }
                        }
                        break;
                    case 'leads':

                        var follower = formState.fields[validation.leads.test];


                        if (follower.touched){
                            var thisVal = follower.value;
                            var thisName = validation.leads.test;
                            var newState = this.validateField(thisVal, thisName, formState, validateWholeForm );
                            formState = newState;
                        }
                        break;

                }
            }
        }

        field.msgs.length > 0? field.valid = false : field.valid = true;//are there any messages in the message field.  If so, it is not valid
        field.touched = true;

        validateWholeForm? formState.valid = this.validateForm(formState) : null;// if we want to validate the whole form we will.

        console.log('RETURNING THIS STATE FROM VALIDATOR:', formState);



        return formState;
    }

    validateAllFields(formState){
        var masterFormState = Object.assign({},formState);
        masterFormState.touched = true;

        for (var field in formState.fields) {
            if (formState.fields.hasOwnProperty(field)) {
                var tempState = this.validateField(formState.fields[field].value, field.toString(), formState, true);
                masterFormState.fields[field] = tempState.fields[field];
                if(!tempState.valid){
                    masterFormState.valid = tempState.valid;
                }
            }
        }

        //console.log(masterFormState);

        return masterFormState;

    }


}