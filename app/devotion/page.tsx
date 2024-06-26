import Link from "next/link";
import Image from "next/image";
import Layout from "../components/Layout";
import type { Metadata } from 'next'
import moment from 'moment-timezone';

async function getData() {
    let today = moment().tz('Asia/Kuala_Lumpur').format('MM-DD-YYYY');
    const res  = await fetch(`https://api.experience.odb.org/devotionals/v2?site_id=1&status=publish&country=MY&on=${today}`,{ next: { revalidate: 3600 } })

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
      }
     
      return res.json()
    }

    export const metadata: Metadata = {
        title: "Devotion | Pekan Christian Community",
        description: "Read the devotional of the day from Pekan Christian Community",
        openGraph: {
            title: "Devotion | Pekan Christian Community",
            description: "Read the devotional of the day from Pekan Christian Community",
        },
    }




export default async function Devotion(){
    const devotions = await getData()

    return (
        <Layout>
            {devotions && devotions.map((devotion) => (
                <main key={devotion.title} className="flex h-full overflow-hidden mb-24">
                <div className="m-auto  my-0">
                        <Image
                            src={devotion.shareable_image}
                            alt={devotion.title}
                            width={1000}
                            height={1000}
                            priority={true}
                            className="object-fit"
                        />
                        <div className="h-48 w-full max-w-screen-md mx-auto relative">                                
                            <div className="p-4 absolute bottom-2 left-0 ">
                                <h2 className="text-4xl  text-black leading-tight font-extrabold text-justify">
                                    {devotion.title}
                                </h2>
                                <div className="flex mt-3">
                                    <Image
                                         src={
                                            devotion.author_link && devotion.author_link.includes("https://odb.org/author/")
                                            ? "https://d626yq9e83zk1.cloudfront.net/authors/" +
                                              devotion.author_link.replace("https://odb.org/author/", "").split("/")[0] + ".jpg"
                                            : "/default-author.jpg"  // Path to a default image if author_link is not valid
                                        }
                                        alt={devotion.author_name}
                                        width={40}  // Adjust the size here
                                        height={40}  // Make sure width and height are the same
                                        className="rounded object-cover	"
                                    />
                                   <p className="font-semibold text-black text-xl absolute left-16">
                                        <Link href={devotion.author_link || "#"} target="_blank" rel="noopener noreferrer">
                                            {devotion.author_name || "Author Unknown"}
                                        </Link>
                                    </p>
                                    <p className="font-semibold text-black text-sm absolute bottom-4 left-16">
                                        {new Date().toDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 lg:px-0 mt-6 text-gray-700 max-w-screen-md mx-auto text-lg leading-relaxed">
                            <p className="text-lg font-semibold text-gray-600 text-justify leading-tight md:text-2xl pb-8">
                                Bible in a Year:{" "}
                                <Link
                                    href={devotion.bible_in_a_year_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline md:text-2xl text-justify"
                                >
                                    {devotion.bible_in_a_year_references}
                                </Link>
                            </p>
                            <div
                                className="text-lg text-justify pl-4 mb-8 italic font-semibold rounded md:text-2xl"
                                dangerouslySetInnerHTML={{ __html: devotion.verse }}
                            />
                            <p className="text-lg font-semibold text-center md:text-left text-gray-600 md:text-2xl pb-4">
                                Today's Scripture: &nbsp;
                                <Link
                                    href={devotion.passage_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="whitespace-nowrap md:whitespace-normal text-lg rounded-full border pt-2 pb-2 pl-4 pr-4 bg-blue-700 text-white md:text-2xl"
                                >
                                    {devotion.passage_reference}
                                </Link>
                            </p>
                            <div className="border-4 border-double border-indigo-600 font-semibold p-4 mb-6">
                                <h2 className="text-2xl text-center  text-indigo-800 font-semibold pb-2">
                                    Insight
                                </h2>
                                <div
                                    className="font-semibold   whitespace-pre-line text-justify	"
                                    dangerouslySetInnerHTML={{ __html: devotion.insights }}
                                />
                            </div>
                            <div
                                className="text-black whitespace-pre-line text-pretty text-justify	"
                                dangerouslySetInnerHTML={{ __html: devotion.content }}
                            />
                            <div className="p-2 text-bold border border-black">
                                <h2 className="text-2xl text-center text-gray-800  mb-4 mt-4 font-bold	">
                                    Reflect & Pray 
                                </h2>
                                    <div
                                        className="text-black text-center font-semibold	 whitespace-pre-line "
                                        dangerouslySetInnerHTML={{ __html: devotion.response }}
                                    />
                       
                                    <div
                                        className="text-black text-center italic "
                                        dangerouslySetInnerHTML={{ __html: devotion.thought }}
                                    />
                            </div>
                        </div>
                    </div>
                </main>
            ))}
        </Layout>
    )
}
