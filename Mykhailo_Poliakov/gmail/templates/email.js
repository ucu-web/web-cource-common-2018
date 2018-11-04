
var code = document.querySelector('.email__template').innerHTML;
var template = Handlebars.compile(code);

var context = {
    "emails": [
        {"from": "Google", "theme": "Theme", "date": "Oct 30"},
        {"from": "Facebook", "theme": "Theme Long", "date": "Oct 29"},
        {"from": "Instagram", "theme": "Theme Long Long", "date": "Oct 28"},
        {"from": "Google", "theme": "Theme", "date": "Sep 10"},
        {"from": "Facebook", "theme": "Theme Long", "date": "Sep 9"},
        {"from": "Instagram", "theme": "Theme Long Long", "date": "Sep 7"},
        {"from": "Google", "theme": "Theme", "date": "Sep 5"},
        {"from": "Facebook", "theme": "Theme Long", "date": "Sep 4"},
        {"from": "Instagram", "theme": "Theme Long Long", "date": "Sep 1"},
        {"from": "Google", "theme": "Theme", "date": "Aug 5"},
        {"from": "Facebook", "theme": "Theme Long", "date": "Aug 4"},
        {"from": "Instagram", "theme": "Theme Long Long", "date": "Aug 3"},
        {"from": "Google", "theme": "Theme", "date": "Jul 25"},
        {"from": "Facebook", "theme": "Theme Long", "date": "Jul 24"},
        {"from": "Instagram", "theme": "Theme Long Long", "date": "Jul 23"}
    ]
};

document.querySelector(".email-container").insertAdjacentHTML('beforeend', template(context));