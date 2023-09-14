// 800px 이하에서 postMan을 초기에 숨김
if (window.innerWidth <= 800) {
    document.getElementById('postMan').style.display = 'none';
  }
  
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
document.querySelector('.beforeSelect a').addEventListener('click', (event) => {
    event.preventDefault(); 
  
   
    document.getElementById('postMan').style.display = 'none';
    document.getElementById('designMan').style.display = 'block';
  
   
    imgElements.forEach((img) => {
      img.style.border = 'none';
    });
  
    
    document.getElementById('postDesign').value = '';
  });


// 선택하기 버튼 클릭 시
  function select() {
    const selectedImage = document.querySelector('.col-4 img[style*="border: 2px solid skyblue"]');
    if (selectedImage) {
      const selectedAlt = selectedImage.getAttribute('alt');
      document.getElementById('postDesign').value = selectedAlt;
  
      if (window.innerWidth <= 800) {
        document.getElementById('postMan').style.display = 'block';
        document.getElementById('designMan').style.display = 'none';
      }
      
      console.log(document.getElementById('postDesign').value);
    } else {
      alert('이미지를 선택해주세요.');
    }
  }

