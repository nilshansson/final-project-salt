export function LinksCard(){
  return (
    <>
        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="my-accordion-2"/>
          <div className="collapse-title text-xl font-medium">
            Youtube links
          </div>
          <div className="collapse-content">
            <p>here is the link: </p>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium">docs</div>
          <div className="collapse-content">
            <p>here is the doc link</p>
          </div>

          {}
        </div>
        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium">katas</div>
          <div className="collapse-content">
            <p>here is the codewars kata</p>
          </div>
        </div>
        </>
  )
}
