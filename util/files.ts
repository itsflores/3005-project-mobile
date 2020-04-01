const books = [{
    "id": "b-01",
    "title": "Unlocking Android",
    "isbn": "1933988673",
    "pageCount": 416,
    "publishedDate": {
      "date": "2009-04-01T00:00:00.000-0700"
    },
    "thumbnailUrl": "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/ableson.jpg",
    "authors": ["W. Frank Ableson", "Charlie Collins", "Robi Sen"],
    "price": 24,
    "categories": ["Open Source", "Mobile"]
  },
  {
    "id": "b-02",
    "title": "Android in Action, Second Edition",
    "isbn": "1935182722",
    "pageCount": 592,
    "publishedDate": {
      "date": "2011-01-14T00:00:00.000-0800"
    },
    "thumbnailUrl": "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/ableson2.jpg",
    "authors": ["W. Frank Ableson", "Robi Sen"],
    "price": 24,
    "categories": ["Java"]
  },
  {
    "id": "b-03",
    "title": "Specification by Example",
    "isbn": "1617290084",
    "pageCount": 0,
    "publishedDate": {
      "date": "2011-06-03T00:00:00.000-0700"
    },
    "thumbnailUrl": "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/adzic.jpg",
    "authors": ["Gojko Adzic"],
    "price": 24,
    "categories": ["Software Engineering"]
  },
  {
    "id": "b-04",
    "title": "Flex 3 in Action",
    "isbn": "1933988746",
    "pageCount": 576,
    "publishedDate": {
      "date": "2009-02-02T00:00:00.000-0800"
    },
    "thumbnailUrl": "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/ahmed.jpg",
    "authors": ["Tariq Ahmed with Jon Hirschi", "Faisal Abid"],
    "price": 24,
    "categories": ["Internet"]
  },
  {
    "id": "b-05",
    "title": "Flex 4 in Action",
    "isbn": "1935182420",
    "pageCount": 600,
    "publishedDate": {
      "date": "2010-11-15T00:00:00.000-0800"
    },
    "thumbnailUrl": "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/ahmed2.jpg",
    "authors": ["Tariq Ahmed", "Dan Orlando", "John C. Bland II", "Joel Hooks"],
    "price": 24,
    "categories": ["Internet"]
  },
  {
    "id": "b-06",
    "title": "Collective Intelligence in Action",
    "isbn": "1933988312",
    "pageCount": 425,
    "publishedDate": {
      "date": "2008-10-01T00:00:00.000-0700"
    },
    "thumbnailUrl": "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/alag.jpg",
    "authors": ["Satnam Alag"],
    "price": 24,
    "categories": ["Internet"]
  },
  {
    "id": "b-07",
    "title": "Zend Framework in Action",
    "isbn": "1933988320",
    "pageCount": 432,
    "publishedDate": {
      "date": "2008-12-01T00:00:00.000-0800"
    },
    "thumbnailUrl": "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/allen.jpg",
    "authors": ["Rob Allen", "Nick Lo", "Steven Brown"],
    "price": 24,
    "categories": ["Web Development"]
  },
  {
    "id": "b-08",
    "title": "Flex on Java",
    "isbn": "1933988797",
    "pageCount": 265,
    "publishedDate": {
      "date": "2010-10-15T00:00:00.000-0700"
    },
    "thumbnailUrl": "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/allmon.jpg",
    "authors": ["Bernerd Allmon", "Jeremy Anderson"],
    "price": 24,
    "categories": ["Internet"]
  },
  {
    "id": "b-09",
    "title": "Griffon in Action",
    "isbn": "1935182234",
    "pageCount": 375,
    "publishedDate": {
      "date": "2012-06-04T00:00:00.000-0700"
    },
    "thumbnailUrl": "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/almiray.jpg",
    "authors": ["Andres Almiray", "Danno Ferrin", "", "James Shingler"],
    "price": 24,
    "categories": ["Java"]
  },
  {
    "id": "b-10",
    "title": "OSGi in Depth",
    "isbn": "193518217X",
    "pageCount": 325,
    "publishedDate": {
      "date": "2011-12-12T00:00:00.000-0800"
    },
    "thumbnailUrl": "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/alves.jpg",
    "authors": ["Alexandre de Castro Alves"],
    "price": 24,
    "categories": ["Java"]
  },
  {
    "id": "b-11",
    "title": "Flexible Rails",
    "isbn": "1933988509",
    "pageCount": 592,
    "publishedDate": {
      "date": "2008-01-01T00:00:00.000-0800"
    },
    "thumbnailUrl": "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/armstrong.jpg",
    "authors": ["Peter Armstrong"],
    "price": 24,
    "categories": ["Web Development"]
  },
  {
    "id": "b-12",
    "title": "Hello! Flex 4",
    "isbn": "1933988762",
    "pageCount": 258,
    "publishedDate": {
      "date": "2009-11-01T00:00:00.000-0700"
    },
    "thumbnailUrl": "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/armstrong3.jpg",
    "authors": ["Peter Armstrong"],
    "price": 24,
    "categories": ["Internet"]
  },
  {
    "id": "b-13",
    "title": "Coffeehouse",
    "isbn": "1884777384",
    "pageCount": 316,
    "publishedDate": {
      "date": "1997-07-01T00:00:00.000-0700"
    },
    "thumbnailUrl": "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/asher.jpg",
    "authors": ["Levi Asher", "Christian Crumlish"],
    "price": 24,
    "categories": ["Miscellaneous"]
  },
  {
    "id": "b-14",
    "title": "Brownfield Application Development in .NET",
    "isbn": "1933988711",
    "pageCount": 550,
    "publishedDate": {
      "date": "2010-04-16T00:00:00.000-0700"
    },
    "thumbnailUrl": "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/baley.jpg",
    "authors": ["Kyle Baley", "Donald Belcham"],
    "price": 24,
    "categories": ["Microsoft"]
  },
  {
    "id": "b-15",
    "title": "MongoDB in Action",
    "isbn": "1935182870",
    "pageCount": 0,
    "publishedDate": {
      "date": "2011-12-12T00:00:00.000-0800"
    },
    "thumbnailUrl": "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/banker.jpg",
    "authors": ["Kyle Banker"],
    "price": 24,
    "categories": ["Next Generation Databases"]
  },
  {
    "id": "b-16",
    "title": "Jaguar Development with PowerBuilder 7",
    "isbn": "1884777864",
    "pageCount": 550,
    "publishedDate": {
      "date": "1999-08-01T00:00:00.000-0700"
    },
    "thumbnailUrl": "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/barlotta2.jpg",
    "authors": ["Michael Barlotta"],
    "price": 24,
    "categories": ["PowerBuilder", "Client-Server"]
  },
  {
    "id": "b-17",
    "title": "Taming Jaguar",
    "isbn": "1884777686",
    "pageCount": 362,
    "publishedDate": {
      "date": "2000-07-01T00:00:00.000-0700"
    },
    "thumbnailUrl": "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/barlotta3.jpg",
    "authors": ["Michael J. Barlotta", "Jason R. Weiss"],
    "price": 24,
    "categories": ["PowerBuilder"]
  },
  {
    "id": "b-18",
    "title": "3D User Interfaces with Java 3D",
    "isbn": "1884777902",
    "pageCount": 520,
    "publishedDate": {
      "date": "2000-08-01T00:00:00.000-0700"
    },
    "thumbnailUrl": "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/barrilleaux.jpg",
    "authors": ["Jon Barrilleaux"],
    "price": 24,
    "categories": ["Java", "Computer Graphics"]
  },
  {
    "id": "b-19",
    "title": "Hibernate in Action",
    "isbn": "193239415X",
    "pageCount": 400,
    "publishedDate": {
      "date": "2004-08-01T00:00:00.000-0700"
    },
    "thumbnailUrl": "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/bauer.jpg",
    "authors": ["Christian Bauer", "Gavin King"],
    "price": 24,
    "categories": ["Java"]
  },
  {
    "id": "b-20",
    "title": "Hibernate in Action (Chinese Edition)",
    "pageCount": 400,
    "publishedDate": {
      "date": "1999-06-01T00:00:00.000-0700"
    },
    "thumbnailUrl": "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/bauer-cn.jpg",
    "authors": ["Christian Bauer", "Gavin King"],
    "price": 24,
    "categories": ["Java"]
  },
]

export default books;