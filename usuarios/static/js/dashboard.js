// Limitar caractéres de texto



const achievement = {
    name: 'Título',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, earum hic. Necessitatibus aut eveniet itaque, vero vitae accusantium repellendus commodi fugit modi exercitationem tenetur similique fugiat, aliquam natus ducimus saepe!',
    dateUnlocked: 'not unlocked yet',
  
  }
  
  console.log(achievementDescription.textContent.length)
  
  const limitCharLength = function(text, maxChars) {
  
    const numChars = text.textContent.length
  
    if (numChars > maxChars) {
      const newText = text.textContent.slice(0, maxChars) + '...'
  
      text.textContent = newText
    }
  
  }
  
  limitCharLength(achievementDescription, 45)
  
  