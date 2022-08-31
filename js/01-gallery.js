import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryContainer = document.querySelector('.gallery');
const galleryMarkup = createGalleryMarkup(galleryItems);

galleryContainer.addEventListener('click', onClickImage);

galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

//створення карточок 
function createGalleryMarkup(galleryItems) {
	return galleryItems
		.map(({ preview, original, description }) => {
			return `<div class="gallery__item">
				<a class="gallery__link" href="${original}">
					<img
						class="gallery__image"
						src="${preview}"
						data-source="${original}"
						alt="${description}"
					/>
				</a>
			</div>`;
		})
		.join('');
}

// делегування колекції
function onClickImage(event) {
	event.preventDefault();
	const imgItem = event.target.classList.value.includes('gallery__image');
	if (!imgItem) return;


	// моддальне вікно
	const currentImgLink = event.target.dataset.source;
	const modal = basicLightbox.create(`<img class="modal__image" src="${currentImgLink}">`);

	modal.show();

	window.addEventListener('keydown', onEscKeyPress);
	function onEscKeyPress(event) {
		const ESC_KEY_CODE = 'Escape';
		if (event.code === ESC_KEY_CODE) {
			modal.close();
			window.removeEventListener('keydown', onEscKeyPress);
		}
	}
}
