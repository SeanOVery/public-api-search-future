const apiCall = document.querySelector('#api-call'),
  results = document.querySelector('.results-container'),
  recentSearchEl = document.querySelector('#recent-search-dropdown'),
  errorDialogEl = document.querySelector('#dialog')

let recentSearchArr = [],
  queryStr = document.location.search.split('&'),
  apiType = queryStr[0].split('0')[1],
  apiToFetch = queryStr[1].split('=')[1],
  searchData = []

const init = () => {
  let storedRecents = JSON.parse(localStorage.getItem('recents'))

  if (storedRecents !== null) {
    recentSearchArr = storedRecents
  }
  createRecentSearchLinks()
  checkApiType()
}

const createRecentSearchLinks = () => {
  for (let i = 0; i < recentSearchArr.length; i++) {
    let newA = document.createElement('a')
    newA.classList.add('item')
    newA.textContent = recentSearchArr[i][2]
    newA.href = `./secondpage.html?apitype=${recentSearchArr[i][0]}&apiselection=${recentSearchArr[i][1]}`
    recentSearchEl.append(newA)
  }
}

const booksApiFunc = () => {
  let callUrl = ''

  if (apiToFetch === 'nytBooks') {
    callUrl =
      'https://api.nytimes.com/svc/books/v3/reviews.json?author=Stephen+King&api-key=Sqt8pojApVeCMUYS08uRPxR68Fn4xtGA'
    fetch(callUrl)
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else if (response.status === 500) {
          throw new Error('500 Internal Server Error')
        }
      })
      .then((data) => {
        searchData = data
        apiCall.innerHTML = `   
        <h1>Example Api Call</h1>   
        <div class="ui grid">
        <div class="sixteen wide column">
        <table class="ui attached inverted table center aligned">
          <thead>
            <th>${searchData.results[0].book_title} by ${searchData.results[0].book_author}</th>
          </thead>
          <tbody>
            <tr>
              <td>Link to NYT review: <a target="_blank" href="${searchData.results[0].url}">${searchData.results[0].book_title} review by ${searchData.results[0].byline}</a></td>
            </tr>
            <tr>
              <td>Summary: ${searchData.results[0].summary}</td>
            </tr>
              <td>Review's Date of Publication: ${searchData.results[0].publication_dt}</td>
          </tbody>
        </table> 
        </div>
        </div>`

        results.innerHTML = `<div class="ui top attached inverted segment center aligned">
        Types of Information you can gather from the library of congress
      </div>
      <table class="ui attached inverted table center aligned">
        <thead>
          <th>New York Times Book Review Search</th>
          <th>New York Times Top lists Search</th>
        </thead>
        <tbody>
          <tr>
            <td>Search For book reviews by Author, Book Title, or ISBN</td>
            <td>Search for NYT top seller lists</td>
          </tr>
          <tr>
            <td>Whichever search query you use the other two are returned in the response</td>
            <td>Publication date, Author name, Title</td>
          </tr>
          <tr>
            <td>A 1 sentence summary is returned</td>
            <td>Rank on best sellers list</td>
          </tr>
          <tr>
            <td>A link to the full review</td>
            <td>A link to purchase the book on amazon</td>
          </tr>
        </tbody>
      </table>`
      })
      .catch((error) => {
        errorDialogEl.innerHTML = `<p>${error}</p>`
        $('.ui.basic.modal').modal('show')
      })
  } else if (apiToFetch === 'libOfCongress') {
    callUrl = 'https://www.loc.gov/search/?q=baseball&fo=json'
    fetch(callUrl)
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else if (response.status === 500) {
          throw new Error('500 Internal Server Error')
        }
      })
      .then((data) => {
        searchData = data
        apiCall.innerHTML = `   
        <h1>Example Api Call</h1>   
        <div class="ui grid">
        <div class="four wide column left">
          <img src="${searchData.results[0].image_url[0]}">
        </div>
        <div class="twelve wide column right">
        <table class="ui attached inverted table center aligned">
          <thead>
            <th>${searchData.results[0].title}</th>
          </thead>
          <tbody>
            <tr>
              <td>Link to LOC article: <a target="_blank" href="${searchData.results[0].url}">${searchData.results[0].title}</a></td>
            </tr>
            <tr>
              <td>Whether article is fully digitized: ${searchData.results[0].digitized}</td>
            </tr>
              <td>Subjects this article covers: ${searchData.results[0].subject[0]}, ${searchData.results[0].subject[1]}</td>
          </tbody>
        </table> 
        </div>
        </div>`

        results.innerHTML = `<div class="ui top attached inverted segment center aligned">
        Types of Information you can gather from the library of congress
      </div>
      <table class="ui attached inverted table center aligned">
        <thead>
          <th>Library of Congress(General Search)</th>
          <th>Library of Congress(Search by Format)</th>
        </thead>
        <tbody>
          <tr>
            <td>General search provides a very wide range of information including the following and more</td>
            <td>Search allowing specification by some of the following formats</td>
          </tr>
          <tr>
            <td>Link to article on LOC website</td>
            <td>Maps, Documents</td>
          </tr>
          <tr>
            <td>Subjects the article covers</td>
            <td>Audio Files, Films, Sheet Music</td>
          </tr>
          <tr>
            <td>Whether the article is fully digitized</td>
            <td>Archived Websites</td>
          </tr>
        </tbody>
      </table>`
      })
      .catch((error) => {
        errorDialogEl.innerHTML = `<p>${error}</p>`
        $('.ui.basic.modal').modal('show')
      })
  } else if (apiToFetch === 'openLibrary') {
    callUrl = 'https://openlibrary.org/search.json?q=the+lord+of+the+rings'
    fetch(callUrl)
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else if (response.status === 500) {
          throw new Error('500 Internal Server Error')
        }
      })
      .then((data) => {
        searchData = data
        apiCall.innerHTML = `   
        <h1>Example Api Call</h1>   
        <div class="ui grid">
        <div class="four wide column left floated">
          <img src="http://covers.openlibrary.org/b/isbn/${
            searchData.docs[1].isbn[1]
          }-M.jpg">
        </div>
        <div class="ten wide column">
        <table class="ui attached inverted table center aligned">
          <thead>
            <th>${searchData.docs[1].title}</th>
          </thead>
          <tbody>
            <tr>
              <td>Author: ${searchData.docs[1].author_name}</td>
            </tr>
            <tr>
              <td>First Year Published: ${
                searchData.docs[1].first_publish_year
              }</td>
            </tr>
              <td>How Many Editions Exist: ${
                searchData.docs[1].edition_count
              }</td>
            <tr>
              <td>Some Characters: ${
                searchData.docs[1].person[
                  Math.floor(Math.random() * searchData.docs[1].person.length)
                ]
              }, ${
          searchData.docs[1].person[
            Math.floor(Math.random() * searchData.docs[1].person.length)
          ]
        }, ${
          searchData.docs[1].person[
            Math.floor(Math.random() * searchData.docs[1].person.length)
          ]
        }</td>
            </tr>
          </tbody>
        </table> 
        </div>
        </div>`

        results.innerHTML = `<div class="ui top attached inverted segment center aligned">
        Types of Information you can gather from open library
      </div>
      <table class="ui attached inverted table center aligned">
        <thead>
          <th>Open Library(Search by name of the book)</th>
          <th>Open Library Covers(Search by ISBN)</th>
        </thead>
        <tbody>
          <tr>
            <td>Year a book was published</td>
            <td>Three options for sizes</td>
          </tr>
          <tr>
            <td>Author of the book</td>
            <td>Small-Thumbnail sized</td>
          </tr>
          <tr>
            <td>How many editions of the book exist</td>
            <td>Medium-Decent size for a small container on a website</td>
          </tr>
          <tr>
            <td>Characters in the book</td>
            <td>Large-Full size image of cover</td>
          </tr>
        </tbody>
      </table>`
      })
      .catch((error) => {
        errorDialogEl.innerHTML = `<p>${error}</p>`
        $('.ui.basic.modal').modal('show')
      })
  } else if (apiToFetch === 'poemist') {
    callUrl = 'https://www.poemist.com/api/v1/randompoems'
    fetch(callUrl)
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else if (response.status === 500) {
          throw new Error('500 Internal Server Error')
        }
      })
      .then((data) => {
        searchData = data
        apiCall.innerHTML = `
      <h1>Example Api Call</h1>  
      <div style="width: 60vw;">
      <div class="ui inverted segment">
        <div class="ui inverted accordion">
          <div class="active title">
          <i class="dropdown icon"></i>
            ${searchData[0].title} by ${searchData[0].poet.name}
          </div>
        <div class="active content">
          <p>${searchData[0].content}</p>
        </div>
        <div class="title">
          <i class="dropdown icon"></i>
            ${searchData[1].title} by ${searchData[1].poet.name}
        </div>
        <div class="content">
          <p>${searchData[1].content}</p>
        </div>
        <div class="title">
          <i class="dropdown icon"></i>
            ${searchData[2].title} by ${searchData[2].poet.name}
        </div>
        <div class="content">
          <p>${searchData[1].content}</p>
        </div>
        </div>
      </div>
      </div>`

        results.innerHTML = `<div class="ui top attached inverted segment center aligned">
        Types of Information you can gather from poemist
      </div>
      <table class="ui attached inverted table center aligned">
        <thead>
          <th>Poemist Random Poem Search</th>
        </thead>
        <tbody>
          <tr>
            <td>5 random poems are returned</td>
          </tr>
          <tr>
            <td>Title of the poems</td>
          </tr>
          <tr>
            <td>Content of the poems</td>
          </tr>
          <tr>
            <td>Author of the poems</td>
          </tr>
        </tbody>
      </table>`
      })
      .then(() => {
        $('.ui.accordion').accordion('refresh')
      })
      .catch((error) => {
        errorDialogEl.innerHTML = `<p>${error}</p>`
        $('.ui.basic.modal').modal('show')
      })
  }
}

const artApiFunc = () => {
  let callUrl = ''

  if (apiToFetch === 'artchicago') {
    callUrl = 'https://api.artic.edu/api/v1/artworks'
    fetch(callUrl)
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else if (response.status === 500) {
          throw new Error('500 Internal Server Error')
        }
      })
      .then((data) => {
        searchData = data
        apiCall.innerHTML = `   
        <h1>ArtWorks Information</h1>   
        <div class="ui grid">
        <div class="sixteen wide column">
        <table class="ui attached inverted table center aligned">
          <thead>
            <th> ${searchData.data[0].category_titles} by ${searchData.data[0].artist_title}</th>
            
          </thead>
          <tbody>
            <tr>
              <td>Category: ${searchData.data[0].category_titles}</td>
            </tr>
            <tr>
              <td>Classification: ${searchData.data[0].classification_title}</td>
            </tr>
            <tr>
              <td>Place of Origin: ${searchData.data[0].place_of_origin}</td>
            </tr>
            <tr>
              <td>Date of Display:${searchData.data[0].date_display}</td>
            </tr>
              
          </tbody>
        </table> 
        </div>
        </div>`

        results.innerHTML = `<div class="ui top attached inverted segment center aligned">
        Types of Information you can gather from the Art Institute of Chicago
      </div>
      <table class="ui attached inverted table center aligned">
        <thead>
          <th>General Search</th>
          <th>Extended Search options</th>
        </thead>
        <tbody>
          <tr>
            <td>Specific search using fields</td>
            <td>Retrieve artworks with images</td>
          </tr>
          <tr>
            <td>Paginate results using page and limit parameters</td>
            <td>Get agents licensed data</td>
          </tr>
          <tr>
            <td>Search and filter results using search end points</td>
            <td>Get Galleries</td>
          </tr>
          <tr>
            <td>Access resources using endpoints </td>
            <td>Mobile Tours</td>
          </tr>
        </tbody>
      </table>`
      })
      .catch((error) => {
        errorDialogEl.innerHTML = `<p>${error}</p>`
        $('.ui.basic.modal').modal('show')
      })
  } else if (apiToFetch === 'metart') {
    callUrl =
      'https://collectionapi.metmuseum.org/public/collection/v1/objects/437133'

    fetch(callUrl)
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else if (response.status === 500) {
          throw new Error('500 Internal Server Error')
        }
      })
      .then((data) => {
        searchData = data
        apiCall.innerHTML = `   
        <h1>ArtWorks Information</h1>   
        <div class="ui grid">
        <div class="sixteen wide column">
        <table class="ui attached inverted table center aligned">
          <thead>
            <th>${searchData.title} by ${searchData.artistDisplayName}</th>
          </thead>
          <tbody>
            <tr>
              <td>Link to Painting URL: <a target="_blank" href="${searchData.objectURL}">${searchData.title}</a></td>
            
            </tr>
            <tr>
              <td>Department: ${searchData.department}</td>
            </tr>
              <td>Artist Bio: ${searchData.artistDisplayBio}</td>
          </tbody>
        </table> 
        </div>
        </div>`

        results.innerHTML = `<div class="ui top attached inverted segment center aligned">
        Types of Information you can gather from the Metropolitan Museum of Art Collection
      </div>
      <table class="ui attached inverted table center aligned">
        <thead>
          <th>Search Categories</th>
          <th>Search Images</th>
        </thead>
        <tbody>
          <tr>
            <td>Department</td>
            <td>Open Access</td>
          </tr>
          <tr>
            <td>Artist/Maker/Culture</td>
            <td>Images of Artwork in Public Domain</td>
          </tr>
          <tr>
            <td>Object type/Material</td>
            <td>Met collection</td>
          </tr>
          <tr>
            <td>Georgraphic Location</td>
            <td>Open Access Stories</td>
          </tr>
          <tr>
            <td>Date/Era</td>
            <td>Image and data Resources</td>
          </tr>
        </tbody>
      </table>`
      })
      .catch((error) => {
        errorDialogEl.innerHTML = `<p>${error}</p>`
        $('.ui.basic.modal').modal('show')
      })
  } else if (apiToFetch === 'clevelandArt') {
    callUrl = 'https://openaccess-api.clevelandart.org/api/artworks/'

    fetch(callUrl)
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else if (response.status === 500) {
          throw new Error('500 Internal Server Error')
        }
      })
      .then((data) => {
        searchData = data
        apiCall.innerHTML = `   
      <h1>ArtWorks Information</h1>   
      <div class="ui grid">
      <div class="sixteen wide column">
      <table class="ui attached inverted table center aligned">
        <thead>
          <th>${searchData.data[0].title} by ${searchData.data[0].creators[0].description}</th>
        </thead>
        <tbody>
          <tr>
            <td>Link to Painting URL: <a target="_blank" href="${searchData.data[0].url}">${searchData.data[0].title}</a></td>
          
          </tr>
          <tr>
            <td>Department: ${searchData.data[0].department}</td>
          </tr>
          <tr>
            <td>Technique: ${searchData.data[0].technique}</td>
          </tr>
            <td>Creation Date: ${searchData.data[0].creation_date_earliest}</td>
        </tbody>
      </table> 
      </div>
      </div>`

        results.innerHTML = `<div class="ui top attached inverted segment center aligned">
      Types of Information you can gather from the Cleveland Museum of Art Collection
    </div>
    <table class="ui attached inverted table center aligned">
      <thead>
        <th>General Search</th>
        <th>Data Search Info</th>
      </thead>
      <tbody>
        <tr>
          <td>GET ArtWorks</td>
          <td>Data sets</td>
        </tr>
        <tr>
          <td>GET Exhibitions</td>
          <td>GitHub Repository</td>
        </tr>
        <tr>
          <td>Collection Online Endpoints</td>
          <td>CCMS</td>
        </tr>
        <tr>
          <td>GET ArtWorks Specific</td>
          <td>CCO "Copyrighted</td>
        </tr>
        <tr>
          <td>GET Creators</td>
          <td>Share_license_status</td>
        </tr>
      </tbody>
    </table>`
      })
      .catch((error) => {
        errorDialogEl.innerHTML = `<p>${error}</p>`
        $('.ui.basic.modal').modal('show')
      })
  }

  if (apiToFetch === 'HarvardArtMuseum') {
    callUrl =
      'https://api.harvardartmuseums.org/object?q=painting&apikey=87912ba2-2131-413a-83b6-f4033acccb48'
    fetch(callUrl)
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else if (response.status === 500) {
          throw new Error('500 Internal Server Error')
        }
      })
      .then((data) => {
        searchData = data
        apiCall.innerHTML = `   
      <h1>ArtWorks Information</h1>   
      <div class="ui grid">
      <div class="sixteen wide column">
      <table class="ui attached inverted table center aligned">
        <thead>
          <th> ${searchData.records[1].title} by ${searchData.records[1].people[0].displayname}</th>
          
        </thead>
        <tbody>
          <tr>
            <td>Department: ${searchData.records[1].department}</td>
          </tr>
          <tr>
            <td>Medium: ${searchData.records[1].medium}</td>
          </tr>
          <tr>
            <td>Division: ${searchData.records[1].division}</td>
          </tr>
          <tr>
            <td>Date begin: ${searchData.records[1].datebegin}</td></td>
          </tr>
            
        </tbody>
      </table> 
      </div>
      </div>`

        results.innerHTML = `<div class="ui top attached inverted segment center aligned">
      Types of Information you can gather from the Harvard Art Museum
    </div>
    <table class="ui attached inverted table center aligned">
      <thead>
        <th>General Search</th>
        <th>Resources Available</th>
      </thead>
      <tbody>
        <tr>
          <td>Search Specific Resource</td>
          <td>Object</td>
        </tr>
        <tr>
          <td>Search Images</td>
          <td>Person</td>
        </tr>
        <tr>
          <td>Experimental Data</td>
          <td>Exhibitions</td>
        </tr>
        <tr>
          <td>Paging through Data</td>
          <td>Publications</td>
        </tr>
        <tr>
          <td>Data Format</td>
          <td>Classification</td>
        </tr>
      </tbody>
    </table>`
      })
      .catch((error) => {
        errorDialogEl.innerHTML = `<p>${error}</p>`
        $('.ui.basic.modal').modal('show')
      })
  }
}

const foodApiFunc = () => {
  let callUrl = ''

  if (apiToFetch === 'foodish') {
    callUrl = 'https://foodish-api.herokuapp.com/api/'
    fetch(callUrl)
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else if (response.status === 500) {
          throw new Error('500 Internal Server Error')
        }
      })
      .then((data) => {
        searchData = data
        apiCall.innerHTML = `
    <h1> Example API Call<h1>
    <div class="ui medium image">
    <img src= ${searchData.image}>
    </div>
    `
        results.innerHTML = `
    <div class="ui top attached inverted segment center aligned">
        Types of Information/Resources gathered from Foodish
      </div>
      <table class="ui attached inverted table center aligned">
        <thead>
          <th>Foodish Random Image Search</th>
        </thead>
        <tbody>
          <tr>
            <td>1 random food image is returned</td>
          </tr>
        </tbody>
      </table>
    `
      })
      .catch((error) => {
        errorDiaglogEl.innerHTML = `<p>${error}<p>`
        $('.ui.basic.modal').modal('show')
      })
  } else if (apiToFetch === 'openBrew') {
    callUrl = 'https://api.openbrewerydb.org/breweries'
    fetch(callUrl)

      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else if (response.status === 500) {
          throw new Error('500 Internal Server Error')
        }
      })
      .then((data) => {
        searchData = data
        var letObj0 = searchData[Math.floor(Math.random() * searchData.length)]
        var letObj1 = searchData[Math.floor(Math.random() * searchData.length)]
        var letObj2 = searchData[Math.floor(Math.random() * searchData.length)]
        apiCall.innerHTML = `
    <h1>Example Api Call</h1>   
    <table class="ui celled inverted table">
      <thead>
        <tr><th>Name</th>
        <th>Type</th>
        <th>Address</th>
      </tr></thead>
      <tbody>
        <tr>
          <td data-label="Name">${letObj0.name}</td>
          <td data-label="Type">${letObj0.brewery_type}</td>
          <td data-label="Address">${letObj0.city}, ${letObj0.state} - ${letObj0.postal_code}</td>
        </tr>
        <tr>
          <td data-label="Name">${letObj1.name}</td>
          <td data-label="Type">${letObj1.brewery_type}</td>
          <td data-label="Address">${letObj1.city}, ${letObj1.state} - ${letObj1.postal_code}</td>
        </tr>
        <tr>
          <td data-label="Name">${letObj2.name}</td>
          <td data-label="Type">${letObj2.brewery_type}</td>
          <td data-label="Address">${letObj2.city}, ${letObj2.state} - ${letObj2.postal_code}</td>
        </tr>
      </tbody>
    </table>
    `
        results.innerHTML = `
    <div class="ui top attached inverted segment center aligned">
        Types of Information/Resources gathered from Open Brew
      </div>
      <table class="ui attached inverted table center aligned">
        <thead>
          <th>Open Brew Search</th>
        </thead>
        <tbody>
          <tr>
            <td>3 random breweries are returned</td>
          </tr>
          <tr>
            <td>The planning types of those breweries</td>
          </tr>
          <tr>
            <td>The City/State and Postal Code are returned</td>
          </tr>
        </tbody>
      </table>
    `
      })
      .catch((error) => {
        errorDiaglogEl.innerHTML = `<p>${error}<p>`
        $('.ui.basic.modal').modal('show')
      })
  } else if (apiToFetch === 'punkAPI') {
    callUrl = 'https://api.punkapi.com/v2/beers/random'
    fetch(callUrl)
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else if (response.status === 500) {
          throw new Error('500 Internal Server Error')
        }
      })
      .then((data) => {
        searchData = data
        apiCall.innerHTML = `
      <h1>Example Api Call</h1>   
        <div class="ui grid">
        <div class="four wide column left floated centered">
          <div class="ui small image">
            <img src= ${searchData[0].image_url}>
          </div>
        </div>
        <div class="ten wide column">
        <table class="ui attached inverted table center aligned">
          <thead>
            <th>${searchData[0].name}</th>
          </thead>
          <tbody>
            <tr>
              <td>ABV Content -  ${searchData[0].abv}% </td>
            </tr>
            <tr>
              <td>First Brewed - ${searchData[0].first_brewed} </td>
            </tr>
              <td>Volume - ${searchData[0].volume.value} ${searchData[0].volume.unit} </td>
            <tr>
              <td>Tagline - ${searchData[0].tagline} </td>
            </tr>
          </tbody>
        </table> 
        </div>
        </div>
    `

    results.innerHTML = `
    <div class="ui top attached inverted segment center aligned">
        Other Resources/Information gathered from Punk API
      </div>
      <table class="ui attached inverted table center aligned">
        <thead>
          <th>Punk API Search</th>
        </thead>
        <tbody>
          <tr>
            <td>The ingredients used in each ale are found in an object.</td>
          </tr>
          <tr>
            <td>A short and concise description of each and every beverage in their database.</td>
          </tr>
          <tr>
            <td>"Brewer's Tips" which are tips from the original brewer on how to perfect the flavor</td>
          </tr>
          <tr>
            <td>"Food Pairing" which is gathered in an array, which lists the best foods that pair with the pulled beverage.</td>
          </tr>
        </tbody>
      </table>
    `
      })
      .catch((error) => {
        errorDiaglogEl.innerHTML = `<p>${error}<p>`
        $('.ui.basic.modal').modal('show')
      })
  } else if (apiToFetch === 'coffee') {
    callUrl =
      'https://aqueous-castle-73239.herokuapp.com/https://coffee.alexflipnote.dev/random.json'
    fetch(callUrl)
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else if (response.status === 500) {
          throw new Error('500 Internal Server Error')
        }
      })
      .then((data) => {
        searchData = data
        apiCall.innerHTML = `

    <h1> Example API Call<h1>
    <div class="ui medium image">
    <img src= ${searchData.file}>
    </div>
    `
        results.innerHTML = `
    <div class="ui top attached inverted segment center aligned">
        Types of Information/Resources gathered from Coffee
      </div>
      <table class="ui attached inverted table center aligned">
        <thead>
          <th>Coffee Random Image Search</th>
        </thead>
        <tbody>
          <tr>
            <td>1 random coffee image is returned</td>
          </tr>
        </tbody>
      </table>
    `
      })
      .catch((error) => {
        errorDiaglogEl.innerHTML = `<p>${error}<p>`
        $('.ui.basic.modal').modal('show')
      })
  }
}

const checkApiType = () => {
  if (apiType === 'Art') {
    artApiFunc()
  } else if (apiType === 'Books') {
    booksApiFunc()
  } else {
    foodApiFunc()
  }
}

init()
