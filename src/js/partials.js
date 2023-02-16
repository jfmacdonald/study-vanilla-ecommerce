import { getCurrencyString } from '@/js/helpers'

const onePhoto = (photo) => `
    <a class="photo" href="./photo/?id=${encodeURIComponent(photo.id)}">
      <img class="photo__image"
        src="${photo.url}"
        alt="${photo.description}"
        aria-describedby="name-${photo.id}" />
      <div class="photo__info">
        <h3 id="name-${photo.id}" class="photo__name">${photo.name}</h3>
        <div class="photo__price">${getCurrencyString(photo.price)}</div>
      </div>
    </a>
    `

export { onePhoto }
