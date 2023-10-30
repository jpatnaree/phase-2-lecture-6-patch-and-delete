import Header from "./Header"
import PetPage from "./PetPage"
import {useState, useEffect} from "react"

function App() {

  const [searchText, setSearchText] = useState("")
  const [formData, setFormData] = useState({
    likes: 0
  })
  const [pets, setPets] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/pets")
    .then(response => response.json())
    .then(petData => setPets(petData))
  }, [])

  const filteredPets = pets.filter(pet => {
    if(searchText === ""){
      return true
    }
    return pet.name.toUpperCase().includes(searchText.toUpperCase())
  })

  function adoptPet(id){
    setPets(pets.filter(pet => {
      return pet.id !== id
    }))

    fetch(`http://localhost:4000/pets/${id}`, {
      method: 'DELETE'
    })
    .then(resp => {
      if (resp.ok) {
        return resp.json()
      }
    })
    .then(deletedPet => {
      console.log(deletedPet)
    })

  }

  function addPet(event){
    event.preventDefault()

    fetch("http://localhost:4000/pets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(newPet => setPets([...pets, newPet]))
  }

  function updateFormData(event){
    setFormData({...formData, [event.target.name]: event.target.value})
  }

  function updateLike(pet) {
    console.log(pet.id)
    fetch(`http://localhost:4000/pets/${pet.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        likes: pet.likes +1
      })
    })
    .then(resp => resp.json())
    .then(updatedLikes => {
      setPets(pets.map(p => {
        if(updatedLikes.id === p.id) {
          return updatedLikes
        } else {
          return p
        }
      }))
    })
  }

  return (
    <div className="app">
      <Header />
      <PetPage pets={filteredPets} setSearchText={setSearchText} adoptPet={adoptPet} addPet={addPet} updateFormData={updateFormData} updateLike={updateLike} />
    </div>
  );
}

export default App;