import {PageFilter} from "./PageFilter";
import {GenderFilter} from "./GenderFilter";

export function FilterSection({handleGenreFilter, handlePageFilter}: any){
    return(
        <div className="flex gap-12 my-8">
            <PageFilter handlePageFilter={handlePageFilter} />
            <GenderFilter handleGenreFilter={handleGenreFilter} />
        </div>
    )
}