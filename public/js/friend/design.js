
  // 이미지 클릭 시 테두리 스타일 변경
  const imgElements = document.querySelectorAll('.col-4 img');
  
  imgElements.forEach((imgElement) => {
    imgElement.addEventListener('click', (event) => {
      imgElements.forEach((img) => {
        img.style.border = 'none';
      });

      event.target.style.border = '2px solid skyblue';
    });
  });
  
// 이전으로 눌렀을 때
document.querySelector('.beforeSelect p').addEventListener('click', (event) => {
    event.preventDefault(); 
  
   
    document.getElementById('postMan').style.display = 'none';
    document.getElementById('designMan').style.display = 'block';
  
   
    imgElements.forEach((img) => {
      img.style.border = 'none';
    });
  
    
    document.getElementById('postDesign').value = '';
  });

  const designMap = {
    1 : '/img/letterIcons/px_acorn.png',
    2 : '/img/letterIcons/px_apple.png',
    3 : '/img/letterIcons/px_apple2.png',
    4 : '/img/letterIcons/px_coin.png',
    5 : '/img/letterIcons/px_food.png',
    6 : '/img/letterIcons/px_hedgehog.png',
    7 : '/img/letterIcons/px_lApple.png',
    8 : '/img/letterIcons/px_nuts.png',
    9 : '/img/letterIcons/px_panda.png',
    10 : '/img/letterIcons/px_pear.png',
    11 : '/img/letterIcons/px_persimmon.png',
    12 : '/img/letterIcons/px_pumpkin.png',
    13 : '/img/letterIcons/px_rabbit.png',
    14 : '/img/letterIcons/px_squirrel.png',
    15 : '/img/letterIcons/px_tree.png',
  };

// 선택하기 버튼 클릭 시
  function select() {
    const selectedImage = document.querySelector('.col-4 img[style*="border: 2px solid skyblue"]');
    if (selectedImage) {
      const selectedAlt = selectedImage.getAttribute('alt');
      document.getElementById('postDesign').value = selectedAlt;
      document.getElementById('selectImg').style.display =  'block';
      document.getElementById('selectImg').src = designMap[selectedAlt];
  
      if (window.innerWidth <= 800) {
        document.getElementById('postMan').style.display = 'block';
        document.getElementById('designMan').style.display = 'none';
      }
      
      console.log(document.getElementById('postDesign').value);
    } else {
      alert('이미지를 선택해주세요.');
    }
  }

