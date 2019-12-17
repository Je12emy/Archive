//! Template Strings
//? We are used the defining string variables in these two ways diferentiating with "" or ''
const greeting = "Hello World!"
const answer = 'Fourty Twwo'
//! In Modern JS there is a new way, also known as Interpolation
//? Here we can add any variable inside a ${ }
const html = `<div>${Math.random()}</div>`
//* We can also make use of multi-line
const anotherHtml =    `<div>
                            ${Math.random()}
                        </div>`

