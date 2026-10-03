const menu=document.querySelector('.menu'),links=document.querySelector('.links');
menu?.addEventListener('click',()=>links.classList.toggle('open'));
document.querySelectorAll('.links a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open')));
const typedTextSpan=document.querySelector('.typed-text');
const words=['Video Editor','Creative Video Editor','Graphic Designer','Content Creator'];
const typingDelay=90,erasingDelay=55,newLetterDelay=1800;
let index=0,charIndex=0;
document.addEventListener('DOMContentLoaded',()=>{if(typedTextSpan)setTimeout(type,newLetterDelay)});
function type(){if(charIndex<words[index].length){typedTextSpan.textContent+=words[index].charAt(charIndex++);setTimeout(type,typingDelay)}else setTimeout(erase,newLetterDelay)}
function erase(){if(charIndex>0){typedTextSpan.textContent=words[index].substring(0,--charIndex);setTimeout(erase,erasingDelay)}else{index=(index+1)%words.length;setTimeout(type,typingDelay+300)}}

document.querySelectorAll('.video-card video').forEach(video=>{
  const placeholder=video.parentElement.querySelector('.video-placeholder');
  const hide=()=>{if(placeholder) placeholder.style.display='none';};
  const show=()=>{if(placeholder) placeholder.style.display='flex';};
  video.addEventListener('loadeddata',hide);
  video.addEventListener('canplay',hide);
  video.addEventListener('error',show);
});

// Keep only one portfolio video playing at a time.
document.querySelectorAll('.video-card video').forEach(video => {
  video.addEventListener('play', () => {
    document.querySelectorAll('.video-card video').forEach(otherVideo => {
      if (otherVideo !== video) otherVideo.pause();
    });
  });
});
