interface IntroCardProps{
  title:string,
  intro:string|null
}

export function IntroCard({title, intro}:IntroCardProps){
  return(
      <div className="card bg-base-100 w-full shadow-xl">
        <div className="card-body prose lg:prose-lg">
          <h2 className="card-title">{title}</h2>
          <p>{intro}</p>
          <div className="card-actions justify-end"></div>
        </div>
      </div>
  )
}
