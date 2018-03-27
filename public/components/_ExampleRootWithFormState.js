/**
 * Created by root on 6/21/17.
 */
//dependencies
import React from 'react';
import ReactDOM from 'react-dom';

//styles!
import styles from '../css/chunks/reactProfile.scss';

//ajax polyfills
import 'whatwg-fetch';
import Promise from 'promise-polyfill';

// To add to window
if (!window.Promise) {
    window.Promise = Promise;
}


import App from '../views/profileForm/App.js';
import App2 from '../views/profileForm/App-validate-on-submit.js';


//
//Form Data
var formState= {

    valid: false,
    touched: false,

    fields: {
        firstName: {
            valid: true,
            touched: false,
            validate: true,
            value: "Thomas4",
            validation: {
                contains: {
                    test: /[0-9]/g,
                    msg: 'Only use letters A to Z.'
                },
                minLength: {
                    test: 3,
                    msg: 'Your name is too short.'
                },
                maxLength: {
                    test: 20,
                    msg: 'Your name is too long.'
                },
                required: {
                    msg: 'This field is required'
                },
                pattern: {
                    test: /^[A-Z]/,
                    msg: 'Your name must begin with a capital letter'
                }
            },
            msgs: []
        },

        password: {
            valid: false,
            touched: false,
            validate: true,
            msgs: [],
            value: "",
            validation: {
                minLength: {
                    test: 8,
                    msg: 'Your password must be 8 characters in length'
                },
                leads: {
                    test: 'confirmPassword'
                },
                required: {
                    msg: 'This field is required'
                }

            }
        },

        confirmPassword: {
            valid: false,
            touched: false,
            validate: true,
            msgs: [],
            value: "",
            validation: {
                matches: {
                    test: 'password',
                    msg: 'This does not match your password'
                },
                required: {
                    msg: 'This field is required'
                }
            }
        },

        selectedTeams: {
            valid: false,
            touched: false,
            validate: true,
            value: [],
            msgs: [],
            validation: {
                required: {
                    msg: 'Pick at least one team'
                }
            }
        },

        selectedSide: {
            valid: false,
            touched: false,
            validate: true,
            value: [],
            msgs: [],
            validation: {
                required: {
                    msg: 'Pick a side'
                }
            }
        },

        hemisphere: {
            valid: false,
            touched: false,
            validate: true,
            value: "",
            msgs: [],
            validation: {
                required:{
                    msg: 'You must select a hemisphere'
                }
            }
        },

        rankTeam: {
            valid: false,
            touched: false,
            validate: true,
            value: "",
            validation: {
                minLength: {
                    test: 3,
                    msg: 'Your rank is too short.'
                },
                required: {
                    msg: 'This field is required'
                }
            },
            msgs: []
        }

    }
};

var formFields = {
    firstName: {
        name: 'firstName',
        label: 'first name',
        placeholder: 'first name',
        inputType: 'text',
        required: true
    },
    password: {
        name: 'password',
        label: 'password',
        inputType: 'password',
        placeholder: 'enter password',
        required: true
    },
    confirmPassword: {
        name: 'confirmPassword',
        label: 'confirm password',
        inputType: 'password',
        placeholder: 'retype password',
        required: true
    },
    selectedTeams: {
        title: 'Select team(s)',
        type: 'checkbox',
        setName: 'selectedTeams',
        options: ['Yankees', 'Mets', 'No Team'],
        required: true
    },
    selectedSide: {
        title: 'Select side',
        type: 'radio',
        setName: 'selectedSide',
        options: ['Good', 'Evil'],
        required: true
    },
    hemisphere: {
        name: 'hemisphere',
        options: ['NE', 'SE', 'SW', 'NW'],
        placeholder: 'Select a hemisphere',
        selectedOption: 'NE',
        label: 'Favorite Hemisphere'
    },
    rankTeam: {
        name: 'rankTeam',
        label: 'rank team',
        placeholder: 'some words',
        inputType: 'text',
        required: true
    }
};


ReactDOM.render( <App formState={formState} formFields={formFields}/>,
    document.getElementById('react-root')
);

ReactDOM.render( <App2 formState={formState} formFields={formFields}/>,
    document.getElementById('react-root2')
);
