const formEl = document.querySelector('.search-form'),
  apiTypeSearch = document.querySelector('.text'),
  apiSelect = document.querySelector('#api-select-dropdown'),
  apiTypeSelect = document.querySelector('.api-type-select'),
  recentSearchEl = document.querySelector('#recent-search-dropdown'),
  hiddenDropdownEl = document.querySelector('#hidden-dropdown'),
  artArr = [
    'Art Institute of Chicago',
    'Metropolitan Museum of Art',
    'Cleveland Museum of Arts',
    'HarvardArtMuseum',
  ],
  artArrShort = ['artchicago', 'metart', 'clevelandArt', 'HarvardArtMuseum'],
  bookArr = [
    'New York Times Books',
    'Library of Congress',
    'Open Library',
    'Poemist',
  ],
  bookArrShort = ['nytBooks', 'libOfCongress', 'openLibrary', 'poemist'],
  foodDrinkArr = ['Foodish', 'Open Brewery', 'Punk API', 'Coffee'],
  foodDrinkArrShort = ['foodish', 'openBrew', 'punkAPI', 'coffee']

let redirectURL = `./secondpage.html?`,
  arr,
  arrShort,
  recentSearchArr = []

const init = () => {
  let storedRecents = JSON.parse(localStorage.getItem('recents'))

  if (storedRecents !== null) {
    recentSearchArr = storedRecents
  }
  createRecentSearchLinks()
}

formEl.addEventListener('submit', (ev) => {
  ev.preventDefault()
  let apiType = apiTypeSearch.innerText,
    apiSelection = apiSelect.value,
    recentSearchSubArray = [
      apiType,
      apiSelection,
      apiSelect.nextSibling.nextSibling.textContent,
    ]
  if (recentSearchArr.length >= 10) {
    recentSearchArr.shift()
    recentSearchArr.push(recentSearchSubArray)
  } else {
    recentSearchArr.push(recentSearchSubArray)
  }
  localStorage.setItem('recents', JSON.stringify(recentSearchArr))
  location.href =
    redirectURL + `apitype=${apiType}&apiselection=${apiSelection}`
})

function setDropdown(event) {
  let target = event.target,
    val
  if (target.hasAttribute('data-select')) {
    hiddenDropdownEl.classList.remove('hidden')
    val = target.innerText.trim()
  }

  if (val === 'Art') {
    arr = artArr
    arrShort = artArrShort
    dropdownCreation()
  }

  if (val === 'Books') {
    arr = bookArr
    arrShort = bookArrShort
    dropdownCreation()
  }

  if (val === 'FoodAndDrinks') {
    arr = foodDrinkArr
    arrShort = foodDrinkArrShort
    dropdownCreation()
  }
}

function dropdownCreation() {
  $('#api-select-dropdown').removeClass('hidden')
  while (apiSelect.firstChild) {
    apiSelect.removeChild(apiSelect.firstChild)
  }
  for (let i = 0; i < arr.length; i++) {
    let newOption = document.createElement('option')

    newOption.setAttribute('value', arrShort[i])
    newOption.textContent = arr[i]
    apiSelect.append(newOption)
  }
}

const createRecentSearchLinks = () => {
  for (let i = 0; i < recentSearchArr.length; i++) {
    let newA = document.createElement('a')
    newA.classList.add('item')
    newA.textContent = recentSearchArr[i][2]
    newA.href =
      redirectURL +
      `apitype=${recentSearchArr[i][0]}&apiselection=${recentSearchArr[i][1]}`
    recentSearchEl.append(newA)
  }
}

apiTypeSelect.addEventListener('click', setDropdown)

$('.ui.dropdown').dropdown()

init()
