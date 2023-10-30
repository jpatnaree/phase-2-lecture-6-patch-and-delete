import NewPetForm from "./NewPetForm"
import Search from "./Search"
import PetList from "./PetList"

function PetPage({pets, setSearchText, adoptPet, addPet, updateFormData, updateLike}){

    return(
        <main>
            <NewPetForm addPet={addPet} updateFormData={updateFormData} />
            <Search setSearchText={setSearchText} />
            <PetList pets={pets} adoptPet={adoptPet} updateLike={updateLike} />
        </main>
    )
}

export default PetPage;