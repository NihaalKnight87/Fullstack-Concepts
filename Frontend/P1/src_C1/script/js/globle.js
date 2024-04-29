document.addEventListener("DOMContentLoaded", function(){

    document.getElementById('ArrowLeft').addEventListener('click', arrowLeftBtn);
    document.getElementById('ArrowRight').addEventListener('click', arrowRightBtn);

    const slider = document.getElementById('WrapContent');
    const slides = document.querySelectorAll('.product');

    const totalSlides = slides.length;
    let curIndex = 0;

    EnableDisableArrows = (() => {
        if(curIndex == 0) document.getElementById('ArrowLeft').disabled = true;
        else document.getElementById('ArrowLeft').disabled = false;

        if(curIndex == totalSlides) document.getElementById('ArrowRight').disabled = true;
        else document.getElementById('ArrowRight').disabled = false;
    });
    pageSlide = ((arrowDir) => {
        if(curIndex <= 0) { EnableDisableArrows(); return; }

        let slideValue;
        if(arrowDir == 'right') slideValue = (-curIndex + 3) * (100 / 3);
        else if(arrowDir == 'left') slideValue = (-curIndex + 1) * (100 / 3);
        slider.style.transform = `translateX(${slideValue}%)`;
        EnableDisableArrows();
    });
    toggleZoom = (() => {
        slides.forEach((slide) => {
            slide.style.transform = 'scale(1)';
            slide.classList.remove('productBg');
            slide.classList.remove('productBorder');
        });
        if(curIndex <=0) return;
        slides[curIndex - 1].style.transform = 'scale(1.4)';
        slides[curIndex - 1].classList.add('productBg');
        slides[curIndex - 1].classList.add('productBorder');
    });
    function productbtn() {
        slides.forEach(slide => {
            const ProductId = slide.getAttribute('id');
            const ProductIndex = slide.getAttribute('data-index');
            document.getElementById(ProductId).addEventListener('click', () => {
                curIndex = ProductIndex;
                toggleZoom();
                EnableDisableArrows();
            });
        });
    }

   //OnStart...
   EnableDisableArrows();
   productbtn();

   function arrowLeftBtn(){
        if(curIndex > 2){ curIndex--; EnableDisableArrows(); }
        else{ curIndex--; pageSlide('left'); }  
        toggleZoom();
    }
    function arrowRightBtn(){
        if(curIndex < 3){ curIndex++; EnableDisableArrows(); }
        else{ curIndex++; pageSlide('right'); }  
        toggleZoom();
    }
});