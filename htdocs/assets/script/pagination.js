$(document).ready(function () {
    $('.btn').on('click', function (e) {

        var section = $(this).data("value");
        console.log(section);
        $("." + section + " > .page-2").toggleClass("page-2-visible");
    });
});


