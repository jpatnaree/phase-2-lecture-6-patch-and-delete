import Pet from "./Pet"

function PetList({pets, adoptPet, updateLike}){

    const petComponents = pets.map(pet => {
        return <Pet key={pet.id} pet={pet} adoptPet={adoptPet} updateLike={updateLike}/>
    })

    return (
        <ul className="pet-list">{petComponents}</ul>
    )
}

export default PetList;