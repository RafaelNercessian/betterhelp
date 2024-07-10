jQuery(document).ready(function ($) {
    //Change home
    var url = 'https://www.mightier.com';

    //Buttons
    var lab_button = $('.blockthirdsectionscience__a--lab');
    var home_button = $('.blockthirdsectionscience__a--home');
    var therapy_button = $('.blockthirdsectionscience__a--therapy');
    var icon_button = $('.blockthirdsectionscience__a--icon');

    //Svg images
    var lab_image = $('.blockthirdsectionscience__img--lab');
    var home_image = $('.blockthirdsectionscience__img--home');
    var therapy_image = $('.blockthirdsectionscience__img--therapy');
    var icon_image = $('.blockthirdsectionscience__img--icon');

    //Hide elements
    var section_lab = $('.blockfourthsectionscience__section--lab');
    var section_home = $('.blockfourthsectionscience__section--home');
    var section_therapy = $('.blockfourthsectionscience__section--therapy');
    var section_icon = $('.blockfourthsectionscience__section--icon');

    section_home.hide();
    section_therapy.hide();
    section_icon.hide();

    //Lab
    lab_button.on('click', function () {
        //Styling changes
        lab_button.addClass('clicked');
        therapy_button.removeClass('clicked');
        icon_button.removeClass('clicked');
        home_button.removeClass('clicked');

        lab_image.attr('src', url + '/wp-content/uploads/2022/08/Lab-Test-White.svg');
        home_image.attr('src', url + '/wp-content/uploads/2022/08/Home.svg');
        therapy_image.attr('src', url + '/wp-content/uploads/2022/08/Physician.svg');
        icon_image.attr('src', url + '/wp-content/uploads/2022/08/Icon.svg');

        section_lab.show();
        section_home.hide();
        section_therapy.hide();
        section_icon.hide();
    });

    //Home
    home_button.on('click', function () {
        //Styling changes
        lab_button.removeClass('clicked');
        therapy_button.removeClass('clicked');
        icon_button.removeClass('clicked');
        home_button.addClass('clicked');

        lab_image.attr('src', url + '/wp-content/uploads/2022/08/Lab-Test.svg');
        home_image.attr('src', url + '/wp-content/uploads/2022/08/House-White.svg');
        therapy_image.attr('src', url + '/wp-content/uploads/2022/08/Physician.svg');
        icon_image.attr('src', url + '/wp-content/uploads/2022/08/Icon.svg');

        section_home.show();
        section_lab.hide();
        section_therapy.hide();
        section_icon.hide();
    })

    //Therapy
    therapy_button.on('click', function () {
        //Styling changes
        lab_button.removeClass('clicked');
        home_button.removeClass('clicked');
        icon_button.removeClass('clicked');
        therapy_button.addClass('clicked');

        lab_image.attr('src', url + '/wp-content/uploads/2022/08/Lab-test.svg');
        home_image.attr('src', url + '/wp-content/uploads/2022/08/Home.svg');
        therapy_image.attr('src', url + '/wp-content/uploads/2022/08/physician-white.svg');
        icon_image.attr('src', url + '/wp-content/uploads/2022/08/Icon.svg');

        section_therapy.show();
        section_lab.hide();
        section_home.hide();
        section_icon.hide();
    });

    //Icon
    icon_button.on('click', function () {
        //Styling changes
        lab_button.removeClass('clicked');
        home_button.removeClass('clicked');
        therapy_button.removeClass('clicked');
        icon_button.addClass('clicked');

        lab_image.attr('src', url + '/wp-content/uploads/2022/08/Lab-test.svg');
        home_image.attr('src', url + '/wp-content/uploads/2022/08/Home.svg');
        therapy_image.attr('src', url + '/wp-content/uploads/2022/08/Physician.svg');
        icon_image.attr('src', url + '/wp-content/uploads/2022/08/icon-white.svg');

        section_icon.show();
        section_therapy.hide();
        section_lab.hide();
        section_home.hide();
    });
});