import { auth } from "@/auth"

const OnboardingPage = async () => {
  const session = await auth()
  return (
    <div>
      {JSON.stringify(session)} <br />
      OnboardingPage 
    </div>
  )
}

export default OnboardingPage
