// ファッションスタイル診断の結果を表示するスクリプト
(function(){
  'use strict';

  var STYLE_LABELS = {
    Simple: 'シンプル / Simple',
    Girly: 'ガーリー / Girly',
    Kireime: 'きれいめ / Kireime',
    'French casual': 'フレンチカジュアル / French Casual',
    Effortless: 'エフォートレス / Effortless',
    Preppy: 'プレッピー / Preppy',
    Mannish: 'マニッシュ / Mannish',
    Cool: 'クール / Cool',
    Street: 'ストリート / Street',
    Korean: '韓国 / Korean'
  };

  var SEASON_LABELS = {
    Spring: '春 / Spring',
    Summer: '夏 / Summer',
    Autumn: '秋 / Autumn',
    Winter: '冬 / Winter'
  };

  var PERSONAL_COLOR_LABELS = {
    YellowSpring: 'イエベ春 / Yellow Spring',
    BlueSummer: 'ブルベ夏 / Blue Summer',
    YellowAutumn: 'イエベ秋 / Yellow Autumn',
    BlueWinter: 'ブルベ冬 / Blue Winter'
  };

  var PERSONAL_COLOR_MAP = {
    YellowSpring: ['#f4cdc2', '#efbd92', '#e4745c', '#e07481', '#dd5e6b', '#d5455a', '#e9923a', '#de5322', '#d9221b', '#ebd262', '#f4e158', '#e5ad26', '#a5c860', '#79b74c', '#309e39', '#67b46a', '#2aab7f', '#45b1a1', '#9dd1d7', '#f4cde2', '#7c93b3', '#0a679d', '#305088', '#8a4788', '#f8f0b7', '#f9e9aa', '#dccec5', '#e1c589', '#d6ab64', '#904d23'],
    BlueSummer: ['#ead1d2', '#ecafbc', '#e899bb', '#e07481', '#d66891', '#b64d77', '#d83b5e', '#be2838', '#c70067', '#ad2557', '#c10f57', '#f0ebb5', '#a1cda8', '#63b587', '#109f76', '#d2eaf0', '#b1d6e2', '#70b2de', '#487ba7', '#3e6181', '#34435c', '#c3bddb', '#9593b9', '#8b307a', '#f9f8e4', '#f5e6c5', '#a58265', '#755239', '#96a7af', '#5c6063'],
    YellowAutumn: ['#eddeb8', '#498d37', '#8c6b2a', '#e2983e', '#eab77e', '#c7a564', '#1c532c', '#817546', '#db7c29', '#d7674c', '#a37e40', '#273619', '#97a46d', '#b37020', '#d25e38', '#61451f', '#43a6a0', '#adb450', '#d0a544', '#d0432c', '#793d21', '#176972', '#abb138', '#e8ca2d', '#c7302b', '#352913', '#452d5f', '#627831', '#b27b1f', '#8f1e22'],
    BlueWinter: ['#ffffff', '#f9e0e0', '#1797cf', '#d31176', '#e899bb', '#c9c9ca', '#f8f6cf', '#146fa7', '#e9e683', '#dc6991', '#898989', '#e9eed5', '#144493', '#1fa258', '#d7557f', '#343432', '#ddeef0', '#11337b', '#118b42', '#922a49', '#040000', '#cfdfd5', '#112a52', '#006939', '#a61e2c', '#351812', '#ded3e7', '#2f204c', '#003f2e', '#bb1a25']
  };

  var PERSONAL_COLOR_ALIASES = {
    yellowspring: 'YellowSpring',
    yellow: 'YellowSpring',
    iebespring: 'YellowSpring',
    'イエベ春': 'YellowSpring',
    bluesummer: 'BlueSummer',
    blue: 'BlueSummer',
    burubesummer: 'BlueSummer',
    'ブルベ夏': 'BlueSummer',
    yellowautumn: 'YellowAutumn',
    iebeautumn: 'YellowAutumn',
    'イエベ秋': 'YellowAutumn',
    bluewinter: 'BlueWinter',
    blubewinter: 'BlueWinter',
    burubewinter: 'BlueWinter',
    'ブルベ冬': 'BlueWinter'
  };

  var IMAGE_MAP = {
    Simple: {
      Spring: ['image/Simple/Spring/Ssp1.webp', 'image/Simple/Spring/Ssp2.webp', 'image/Simple/Spring/Ssp3.webp'],
      Summer: ['image/Simple/Summer/Ssu1.jpg', 'image/Simple/Summer/Ssu2.jpg', 'image/Simple/Summer/Ssu3.webp'],
      Autumn: ['image/Simple/Autumn/Sa1.jpg', 'image/Simple/Autumn/Sa2.jpg', 'image/Simple/Autumn/Sa3.jpg'],
      Winter: ['image/Simple/Winter/Sw1.jpg', 'image/Simple/Winter/Sw2.webp', 'image/Simple/Winter/Sw3.jpg']
    },
    Girly: {
      Spring: ['image/Girly/Spring/Gsp1.avif', 'image/Girly/Spring/Gsp2.webp', 'image/Girly/Spring/Gsp3.webp'],
      Summer: ['image/Girly/Summer/Gsu1.avif', 'image/Girly/Summer/Gsu2.avif', 'image/Girly/Summer/Gsp3.webp'],
      Autumn: ['image/Girly/Autumn/Ga1.webp', 'image/Girly/Autumn/Ga2.webp', 'image/Girly/Autumn/Ga3.webp'],
      Winter: ['image/Girly/Winter/Gw1.webp', 'image/Girly/Winter/gw2.webp', 'image/Girly/Winter/Gw3.webp']
    },
    Kireime: {
      Spring: ['image/Kireime/Spring/Ksp1.jpg', 'image/Kireime/Spring/Ksp2.jpg', 'image/Kireime/Spring/Ksp3.jpg'],
      Summer: ['image/Kireime/Summer/Ksu1.jpg', 'image/Kireime/Summer/Ksu2.webp', 'image/Kireime/Summer/Ksu3.jpg'],
      Autumn: ['image/Kireime/Autumn/Ka1.jpg', 'image/Kireime/Autumn/Ka2.jpg', 'image/Kireime/Autumn/Ka3.webp'],
      Winter: ['image/Kireime/Winter/Kw1.webp', 'image/Kireime/Winter/Kw2.jpg', 'image/Kireime/Winter/Kw3.jpg']
    },
    'French casual': {
      Spring: ['image/French casual/Spring/Fsp1.jpg', 'image/French casual/Spring/Fsp2.webp', 'image/French casual/Spring/Fsp3.jpg'],
      Summer: ['image/French casual/Summer/Fsu1.jpg', 'image/French casual/Summer/Fsu2.webp', 'image/French casual/Summer/Fsu3.avif'],
      Autumn: ['image/French casual/Autumn/Fa1.jpg', 'image/French casual/Autumn/Fa2.webp', 'image/French casual/Autumn/Fa3.webp'],
      Winter: ['image/French casual/Winter/Fw1.webp', 'image/French casual/Winter/Fw2.jpg', 'image/French casual/Winter/Fw3.jpg']
    },
    Effortless: {
      Spring: ['image/Effortless/Spring/Esp1.webp', 'image/Effortless/Spring/Esp2.webp', 'image/Effortless/Spring/Esp3.jpg'],
      Summer: ['image/Effortless/Summer/Esu1.jpg', 'image/Effortless/Summer/Esu2.jpg', 'image/Effortless/Summer/Esu3.jpg'],
      Autumn: [],
      Winter: []
    },
    Preppy: {
      Spring: ['image/Preppy/Spring/Psp1.jpg', 'image/Preppy/Spring/Psp2.jpg', 'image/Preppy/Spring/Psp3.jpg'],
      Summer: ['image/Preppy/Summer/Psu1.avif', 'image/Preppy/Summer/Psu2.jpg', 'image/Preppy/Summer/Psu3.jpg'],
      Autumn: ['image/Preppy/Autumn/Pa1.avif', 'image/Preppy/Autumn/Pa2.webp', 'image/Preppy/Autumn/Pa3.jpg'],
      Winter: ['image/Preppy/Winter/Pw1.avif', 'image/Preppy/Winter/Pw2.webp', 'image/Preppy/Winter/Pw3.jpg']
    },
    Mannish: {
      Spring: ['image/Mannish/Spring/Msp1.jpg', 'image/Mannish/Spring/Msp2.jpg', 'image/Mannish/Spring/Msp3.jpg'],
      Summer: ['image/Mannish/Summer/Msu1.jpg', 'image/Mannish/Summer/Msu2.jpg', 'image/Mannish/Summer/Msu3.webp'],
      Autumn: ['image/Mannish/Autumn/Ma1.webp', 'image/Mannish/Autumn/Ma2.webp', 'image/Mannish/Autumn/Ma3.jpg'],
      Winter: ['image/Mannish/Winter/Mw1.jpg', 'image/Mannish/Winter/Mw2.webp', 'image/Mannish/Winter/Mw3.jpg']
    },
    Cool: {
      Spring: ['image/Cool/Spring/Csp1.webp', 'image/Cool/Spring/Csp2.jpg', 'image/Cool/Spring/Csp3.webp'],
      Summer: ['image/Cool/Summer/Csu1.jpg', 'image/Cool/Summer/Csu2.webp', 'image/Cool/Summer/Csu3.jpg'],
      Autumn: ['image/Cool/Autumn/Ca1.jpg', 'image/Cool/Autumn/Ca2.jpg', 'image/Cool/Autumn/Ca3.jpg'],
      Winter: ['image/Cool/Winter/Cw1.webp', 'image/Cool/Winter/Cw2.jpg', 'image/Cool/Winter/Cw3.webp']
    },
    Street: {
      Spring: ['image/Street/Spring/STsp1.jpg', 'image/Street/Spring/STsp2.jpg', 'image/Street/Spring/STsp3.jpg'],
      Summer: ['image/Street/Summer/STsu1.webp', 'image/Street/Summer/STsu2.jpg', 'image/Street/Summer/STsu3.jpg'],
      Autumn: ['image/Street/Autumn/STa1.jpg', 'image/Street/Autumn/STa2.jpg', 'image/Street/Autumn/STa3.jpg'],
      Winter: ['image/Street/Winter/STw1.jpg', 'image/Street/Winter/STw2.jpg', 'image/Street/Winter/STw3.jpg']
    },
    Korean: {
      Spring: ['image/Korean/Spring/KOsp1.jpg', 'image/Korean/Spring/KOsp2.jpg', 'image/Korean/Spring/KOsp3.jpg'],
      Summer: ['image/Korean/Summer/Ksu1.jpg', 'image/Korean/Summer/KOsu2.jpg', 'image/Korean/Summer/KOsu3.jpg'],
      Autumn: ['image/Korean/Autumn/KOa1.jpg', 'image/Korean/Autumn/KOa2.jpg', 'image/Korean/Autumn/KOa3.jpg'],
      Winter: ['image/Korean/Winter/KOw1.jpg', 'image/Korean/Winter/KOw2.jpg', 'image/Korean/Winter/KOw3.jpg']
    }
  };

  // ここに各画像のリンク先URLを入れると、検索結果の写真をクリックしたときに遷移します。
  // 画像パスをキーにしてURLを設定してください。空文字のままなら画像ファイル自体を開きます。
  var IMAGE_LINK_MAP = {
    'image/Simple/Spring/Ssp1.webp': 'https://oggi.jp/7780663',
    'image/Simple/Spring/Ssp2.webp': 'https://oggi.jp/7780663',
    'image/Simple/Spring/Ssp3.webp': 'https://oggi.jp/7780663',
    'image/Simple/Summer/Ssu1.jpg': 'https://oggi.jp/7464097',
    'image/Simple/Summer/Ssu2.jpg': 'https://oggi.jp/7499614',
    'image/Simple/Summer/Ssu3.webp': 'https://oggi.jp/7849014',
    'image/Simple/Autumn/Sa1.jpg': 'https://oggi.jp/6826774',
    'image/Simple/Autumn/Sa2.jpg': 'https://oggi.jp/6571285',
    'image/Simple/Autumn/Sa3.jpg': 'https://oggi.jp/6365095',
    'image/Simple/Winter/Sw1.jpg': 'https://oggi.jp/7121204',
    'image/Simple/Winter/Sw2.webp': 'https://oggi.jp/7626488',
    'image/Simple/Winter/Sw3.jpg': 'https://oggi.jp/7121204',
    'image/Girly/Spring/Gsp1.avif': 'https://www.fint-shop.com/c/all/57AJ04j001',
    'image/Girly/Spring/Gsp2.webp': 'https://jemiremi.com/products/fsout1546',
    'image/Girly/Spring/Gsp3.webp': 'https://jemiremi.com/products/fstps5664',
    'image/Girly/Summer/Gsu1.avif': 'https://www.fint-shop.com/c/all/58AI02g017',
    'image/Girly/Summer/Gsu2.avif': 'https://www.fint-shop.com/c/all/58AG06k009',
    'image/Girly/Summer/Gsp3.webp': 'https://jemiremi.com/products/fstps5670',
    'image/Girly/Autumn/Ga1.webp': 'https://jemiremi.com/products/fsout1537',
    'image/Girly/Autumn/Ga2.webp': 'https://jemiremi.com/products/fsout1549',
    'image/Girly/Autumn/Ga3.webp': 'https://jemiremi.com/products/fsset0739',
    'image/Girly/Winter/Gw1.webp': 'https://jemiremi.com/products/fsout1500',
    'image/Girly/Winter/gw2.webp': 'https://jemiremi.com/products/fsout1530',
    'image/Girly/Winter/Gw3.webp': 'https://jemiremi.com/products/fsout1527',
    'image/Kireime/Spring/Ksp1.jpg': 'https://oggi.jp/7431470',
    'image/Kireime/Spring/Ksp2.jpg': 'https://oggi.jp/7518001',
    'image/Kireime/Spring/Ksp3.jpg': 'https://oggi.jp/7502932',
    'image/Kireime/Summer/Ksu1.jpg': 'https://oggi.jp/7549423',
    'image/Kireime/Summer/Ksu2.webp': 'https://jemiremi.com/products/fsopc4417',
    'image/Kireime/Summer/Ksu3.jpg': 'https://oggi.jp/7480027',
    'image/Kireime/Autumn/Ka1.jpg': 'https://oggi.jp/7064553',
    'image/Kireime/Autumn/Ka2.jpg': 'https://oggi.jp/7066264',
    'image/Kireime/Autumn/Ka3.webp': 'https://jemiremi.com/products/fsout1370',
    'image/Kireime/Winter/Kw1.webp': 'https://jemiremi.com/products/fstps5239',
    'image/Kireime/Winter/Kw2.jpg': 'https://oggi.jp/7369501',
    'image/Kireime/Winter/Kw3.jpg': 'https://oggi.jp/7360772',
    'image/French casual/Spring/Fsp1.jpg': 'https://oggi.jp/7204935',
    'image/French casual/Spring/Fsp2.webp': 'https://oggi.jp/7758323',
    'image/French casual/Spring/Fsp3.jpg': 'https://oggi.jp/122612',
    'image/French casual/Summer/Fsu1.jpg': 'https://oggi.jp/7208484',
    'image/French casual/Summer/Fsu2.webp': 'https://jemiremi.com/products/fstps5425',
    'image/French casual/Summer/Fsu3.avif': 'https://www.fint-shop.com/c/all/58BG05p013',
    'image/French casual/Autumn/Fa1.jpg': 'https://oggi.jp/6304806',
    'image/French casual/Autumn/Fa2.webp': 'https://jemiremi.com/products/fstps4732',
    'image/French casual/Autumn/Fa3.webp': 'https://jemiremi.com/products/fsout1175',
    'image/French casual/Winter/Fw1.webp': 'https://jemiremi.com/products/fstps4185',
    'image/French casual/Winter/Fw2.jpg': 'https://oggi.jp/7117318',
    'image/French casual/Winter/Fw3.jpg': 'https://oggi.jp/6429003',
    'image/Effortless/Spring/Esp1.webp': 'https://oggi.jp/7780622',
    'image/Effortless/Spring/Esp2.webp': 'https://oggi.jp/76439',
    'image/Effortless/Spring/Esp3.jpg': 'https://oggi.jp/7145276',
    'image/Effortless/Summer/Esu1.jpg': 'https://oggi.jp/7009928',
    'image/Effortless/Summer/Esu2.jpg': 'https://oggi.jp/6758904',
    'image/Effortless/Summer/Esu3.jpg': 'https://oggi.jp/6526571',
    'image/Effortless/Autumn/Ea1.jpg': 'https://oggi.jp/6387271',
    'image/Effortless/Autumn/Ea2.jpg': 'https://oggi.jp/7086681',
    'image/Effortless/Autumn/Ea3.jpg': 'https://oggi.jp/7595633',
    'image/Effortless/Winter/Ew1.jpg': 'https://oggi.jp/44949',
    'image/Effortless/Winter/Ew2.jpg': 'https://oggi.jp/57133',
    'image/Effortless/Winter/Ew3.jpg': 'https://oggi.jp/29716',
    'image/Preppy/Spring/Psp1.jpg': 'https://oggi.jp/7240434',
    'image/Preppy/Spring/Psp2.jpg': 'https://oggi.jp/7447046',
    'image/Preppy/Spring/Psp3.jpg': 'https://oggi.jp/7439860',
    'image/Preppy/Summer/Psu1.avif': 'http://fint-shop.com/c/all/57AG02k006',
    'image/Preppy/Summer/Psu2.jpg': 'https://oggi.jp/7443287',
    'image/Preppy/Summer/Psu3.jpg': 'https://oggi.jp/7532864',
    'image/Preppy/Autumn/Pa1.avif': 'https://www.fint-shop.com/c/archives/49AF01j001',
    'image/Preppy/Autumn/Pa2.webp': 'https://oggi.jp/7583726',
    'image/Preppy/Autumn/Pa3.jpg': 'https://oggi.jp/7308823',
    'image/Preppy/Winter/Pw1.avif': 'https://www.fint-shop.com/c/all/52AD02j011',
    'image/Preppy/Winter/Pw2.webp': 'https://oggi.jp/7600959',
    'image/Preppy/Winter/Pw3.jpg': 'https://oggi.jp/7358195',
    'image/Mannish/Spring/Msp1.jpg': 'https://oggi.jp/6981738',
    'image/Mannish/Spring/Msp2.jpg': 'https://oggi.jp/7479475',
    'image/Mannish/Spring/Msp3.jpg': 'https://oggi.jp/7218116',
    'image/Mannish/Summer/Msu1.jpg': 'https://oggi.jp/7245216',
    'image/Mannish/Summer/Msu2.jpg': 'https://oggi.jp/7037537',
    'image/Mannish/Summer/Msu3.webp': 'https://oggi.jp/7881414',
    'image/Mannish/Autumn/Ma1.webp': 'https://oggi.jp/7611518',
    'image/Mannish/Autumn/Ma2.webp': 'https://oggi.jp/7609803',
    'image/Mannish/Autumn/Ma3.jpg': 'https://oggi.jp/7068233',
    'image/Mannish/Winter/Mw1.jpg': 'https://oggi.jp/7163808',
    'image/Mannish/Winter/Mw2.webp': 'https://oggi.jp/7627806',
    'image/Mannish/Winter/Mw3.jpg': 'https://oggi.jp/7369396',
    'image/Cool/Spring/Csp1.webp': 'https://oggi.jp/7777059',
    'image/Cool/Spring/Csp2.jpg': 'https://oggi.jp/6696287',
    'image/Cool/Spring/Csp3.webp': 'https://oggi.jp/7874657',
    'image/Cool/Summer/Csu1.jpg': 'https://oggi.jp/7512023',
    'image/Cool/Summer/Csu2.webp': 'https://oggi.jp/7890594',
    'image/Cool/Summer/Csu3.jpg': 'https://oggi.jp/7252370',
    'image/Cool/Autumn/Ca1.jpg': 'https://oggi.jp/7050088',
    'image/Cool/Autumn/Ca2.jpg': 'https://oggi.jp/6599961',
    'image/Cool/Autumn/Ca3.jpg': 'https://oggi.jp/6367246',
    'image/Cool/Winter/Cw1.webp': 'https://jemiremi.com/products/fsout1480',
    'image/Cool/Winter/Cw2.jpg': 'https://oggi.jp/7386262',
    'image/Cool/Winter/Cw3.webp': 'https://oggi.jp/7642306',
    'image/Street/Spring/STsp1.jpg': 'https://oggi.jp/98545',
    'image/Street/Spring/STsp2.jpg': 'https://oggi.jp/6000329',
    'image/Street/Spring/STsp3.jpg': 'https://oggi.jp/7429211',
    'image/Street/Summer/STsu1.webp': 'https://oggi.jp/7570936',
    'image/Street/Summer/STsu2.jpg': 'https://oggi.jp/6811316',
    'image/Street/Summer/STsu3.jpg': 'https://oggi.jp/7009364',
    'image/Street/Autumn/STa1.jpg': 'https://oggi.jp/6330943',
    'image/Street/Autumn/STa2.jpg': 'https://oggi.jp/6623014',
    'image/Street/Autumn/STa3.jpg': 'https://oggi.jp/96726',
    'image/Street/Winter/STw1.jpg': 'https://oggi.jp/6685021',
    'image/Street/Winter/STw2.jpg': 'https://oggi.jp/7115275',
    'image/Street/Winter/STw3.jpg': 'https://oggi.jp/7411050',
    'image/Korean/Spring/KOsp1.jpg': 'https://oggi.jp/7417127',
    'image/Korean/Spring/KOsp2.jpg': 'https://oggi.jp/7152307',
    'image/Korean/Spring/KOsp3.jpg': 'https://oggi.jp/7431470',
    'image/Korean/Summer/Ksu1.jpg': 'https://oggi.jp/7263493',
    'image/Korean/Summer/KOsu2.jpg': 'https://oggi.jp/7200887',
    'image/Korean/Summer/KOsu3.jpg': 'https://oggi.jp/7277915',
    'image/Korean/Autumn/KOa1.jpg': 'https://oggi.jp/7308276',
    'image/Korean/Autumn/KOa2.jpg': 'https://oggi.jp/7312314',
    'image/Korean/Autumn/KOa3.jpg': 'https://oggi.jp/7295312',
    'image/Korean/Winter/KOw1.jpg': 'https://oggi.jp/7374588',
    'image/Korean/Winter/KOw2.jpg': 'https://oggi.jp/7409180',
    'image/Korean/Winter/KOw3.jpg': 'https://oggi.jp/7408236'
  };

  function normalize(value){
    return String(value || '').trim().toLowerCase().replace(/[\s\-_]+/g, '');
  }

  function resolveStyle(value){
    var v = normalize(value);
    if(!v) return 'Simple';

    if(v.indexOf('シンプル') !== -1 || v === 'simple') return 'Simple';
    if(v.indexOf('ガーリー') !== -1 || v === 'girly') return 'Girly';
    if(v.indexOf('きれいめ') !== -1 || v === 'kireime') return 'Kireime';
    if(v.indexOf('フレンチ') !== -1 || v.indexOf('french') !== -1) return 'French casual';
    if(v.indexOf('エフォートレス') !== -1 || v === 'effortless') return 'Effortless';
    if(v.indexOf('プレッピー') !== -1 || v === 'preppy') return 'Preppy';
    if(v.indexOf('マニッシュ') !== -1 || v === 'mannish') return 'Mannish';
    if(v.indexOf('クール') !== -1 || v === 'cool') return 'Cool';
    if(v.indexOf('ストリート') !== -1 || v === 'street') return 'Street';
    if(v.indexOf('韓国') !== -1 || v.indexOf('korean') !== -1 || v.indexOf('k-pop') !== -1) return 'Korean';

    return 'Simple';
  }

  function resolveSeason(value){
    var v = normalize(value);
    if(!v) return 'Spring';

    if(v.indexOf('春') !== -1 || v.indexOf('spring') !== -1) return 'Spring';
    if(v.indexOf('夏') !== -1 || v.indexOf('summer') !== -1) return 'Summer';
    if(v.indexOf('秋') !== -1 || v.indexOf('autumn') !== -1 || v.indexOf('fall') !== -1) return 'Autumn';
    if(v.indexOf('冬') !== -1 || v.indexOf('winter') !== -1) return 'Winter';

    return 'Spring';
  }

  function resolvePersonalColor(value){
    var v = normalize(value);
    if(!v) return 'YellowSpring';

    if(PERSONAL_COLOR_ALIASES[v]) return PERSONAL_COLOR_ALIASES[v];
    return 'YellowSpring';
  }

  function getImageLink(src){
    return IMAGE_LINK_MAP[src] || src;
  }

  function buildCandidates(styleKey, seasonKey){
    var styleMap = IMAGE_MAP[styleKey] || {};
    var imagePaths = styleMap[seasonKey] || [];

    return imagePaths.map(function(path, index){
      return {
        src: path,
        href: getImageLink(path)
      };
    });
  }

  function createImageElement(src){
    var img = document.createElement('img');
    img.src = src;
    img.alt = '';
    img.className = 'result-image';
    return img;
  }

  function createColorSwatch(colorValue){
    var swatch = document.createElement('div');
    swatch.className = 'color-swatch';
    if(colorValue){
      swatch.style.background = colorValue;
    }
    return swatch;
  }

  function displayImages(gridEl, imageItems){
    if(!gridEl) return;

    gridEl.innerHTML = '';
    var validCount = 0;

    imageItems.forEach(function(item){
      if(!item || !item.src) return;

      var linkEl = document.createElement('a');
      linkEl.className = 'result-link';
      linkEl.href = item.href || item.src;
      linkEl.target = '_blank';
      linkEl.rel = 'noopener noreferrer';

      var img = createImageElement(item.src);
      linkEl.appendChild(img);
      gridEl.appendChild(linkEl);
      validCount++;
    });

    if(validCount === 0){
      gridEl.innerHTML = '<p style="grid-column: 1/-1; color: #999;">写真がありません</p>';
    }
  }

  function displayColors(gridEl, colorValues){
    if(!gridEl) return;

    gridEl.innerHTML = '';
    var validCount = 0;

    colorValues.forEach(function(colorValue){
      var swatch = createColorSwatch(colorValue);
      gridEl.appendChild(swatch);
      validCount++;
    });

    if(validCount === 0){
      gridEl.innerHTML = '<p style="grid-column: 1/-1; color: #999;">色がありません</p>';
    }
  }

  var resultEl = document.getElementById('style-result');
  var gridEl = document.getElementById('photo-grid');
  var colorGridEl = document.getElementById('color-grid');
  var detailEl = document.getElementById('result-detail');
  var formEl = document.getElementById('search-form');
  var styleSelectEl = document.getElementById('style-select');
  var seasonSelectEl = document.getElementById('season-select');
  var personalColorSelectEl = document.getElementById('personal-color-select');
  if(!resultEl) return;

  var styleOptions = [
    ['Simple', 'シンプル / Simple'],
    ['Girly', 'ガーリー / Girly'],
    ['Kireime', 'きれいめ / Kireime'],
    ['French casual', 'フレンチカジュアル / French Casual'],
    ['Effortless', 'エフォートレス / Effortless'],
    ['Preppy', 'プレッピー / Preppy'],
    ['Mannish', 'マニッシュ / Mannish'],
    ['Cool', 'クール / Cool'],
    ['Street', 'ストリート / Street'],
    ['Korean', '韓国 / Korean']
  ];

  var seasonOptions = [
    ['Spring', '春 / Spring'],
    ['Summer', '夏 / Summer'],
    ['Autumn', '秋 / Autumn'],
    ['Winter', '冬 / Winter']
  ];

  var personalColorOptions = [
    ['YellowSpring', 'イエベ春 / Yellow Spring'],
    ['BlueSummer', 'ブルベ夏 / Blue Summer'],
    ['YellowAutumn', 'イエベ秋 / Yellow Autumn'],
    ['BlueWinter', 'ブルベ冬 / Blue Winter']
  ];

  function populateSelect(selectEl, options, selectedValue){
    if(!selectEl) return;

    selectEl.innerHTML = '';
    options.forEach(function(option){
      var opt = document.createElement('option');
      opt.value = option[0];
      opt.textContent = option[1];
      if(option[0] === selectedValue){
        opt.selected = true;
      }
      selectEl.appendChild(opt);
    });
  }

  var params = new URLSearchParams(window.location.search);
  var styleKey = resolveStyle(params.get('style') || params.get('type') || params.get('fashion'));
  var seasonKey = resolveSeason(params.get('season') || params.get('seasonal'));
  var personalColorKey = resolvePersonalColor(params.get('personalColor') || params.get('pc'));
  var styleLabel = STYLE_LABELS[styleKey] || styleKey;
  var seasonLabel = SEASON_LABELS[seasonKey] || seasonKey;
  var personalColorLabel = PERSONAL_COLOR_LABELS[personalColorKey] || personalColorKey;

  populateSelect(styleSelectEl, styleOptions, styleKey);
  populateSelect(seasonSelectEl, seasonOptions, seasonKey);
  populateSelect(personalColorSelectEl, personalColorOptions, personalColorKey);

  if(formEl){
    formEl.addEventListener('submit', function(event){
      event.preventDefault();

      var nextParams = new URLSearchParams(window.location.search);
      nextParams.set('style', styleSelectEl ? styleSelectEl.value : styleKey);
      nextParams.set('season', seasonSelectEl ? seasonSelectEl.value : seasonKey);
      nextParams.set('personalColor', personalColorSelectEl ? personalColorSelectEl.value : personalColorKey);
      window.location.search = nextParams.toString();
    });
  }

  resultEl.innerHTML = '';

  var title = document.createElement('div');
  title.style.fontSize = '2rem';
  title.style.lineHeight = '1.4';
  title.style.margin = '10px 0';
  title.textContent = seasonLabel + ' × ' + styleLabel;
  resultEl.appendChild(title);


  resultEl.style.opacity = '0';
  setTimeout(function(){
    resultEl.style.transition = 'opacity .5s ease';
    resultEl.style.opacity = '1';
  }, 100);

  if(gridEl && detailEl){
    var imageItems = buildCandidates(styleKey, seasonKey);
    displayImages(gridEl, imageItems);
    displayColors(colorGridEl, PERSONAL_COLOR_MAP[personalColorKey] || ['', '', '']);
    detailEl.textContent = '検索条件: ' + seasonLabel + ' / ' + styleLabel + ' / ' + personalColorLabel;
  }
})();
