import HomeLoadingCard from "@/components/cards/HomeLoadingCard"

const loading = () => {
    return (
        <div
        className='p-3 flex flex-wrap items-center gap-5 xs:flex-row'
        >
        <HomeLoadingCard />
        <HomeLoadingCard />
        <HomeLoadingCard />
        <HomeLoadingCard />
        <HomeLoadingCard />
        <HomeLoadingCard />
    
      </div>
    )
  }

export default loading