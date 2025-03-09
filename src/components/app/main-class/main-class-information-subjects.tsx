import SubjectCardSmall from '@/components/cards/subject-card-small'
interface props {
  mainClassId : string
}
const MainClassInformationSubjects = ({mainClassId} : props) => {
  return (
    <div>
      {[...Array(5)].map((_, i) => (
        <SubjectCardSmall key={i}/>
      ))}
    </div>
  )
}

export default MainClassInformationSubjects
