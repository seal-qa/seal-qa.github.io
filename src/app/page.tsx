import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import type { RowData } from "@/components/results-table/columns";
import { DataTable } from "@/components/results-table/data-table";
import { columns } from "@/components/results-table/columns";
import { bearCubsLeaderboard } from "@/data/bear_cubs_leaderboard";
import { CollapsibleSection } from "@/components/dropdown-section";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
export default function Home() {
  const parsedData: RowData[] = bearCubsLeaderboard;
  return (
    // Main container
    <div className="w-full h-full flex flex-col items-center justify-baseline px-0 py-2 md:p-8">
      {/* Content Container */}
      <div className="w-full md:max-w-[70%] mx-auto flex flex-col gap-4 md:gap-8 shadow-lg p-6 md:p-8 rounded-lg items-start justify-center pb-8">
        <header className="w-full flex flex-col gap-2 md:gap-4">
          <div className="flex flex-col items-center justify-center gap-1 md:gap-2">
            <div className="flex flex-row items-center justify-center gap-2 md:gap-4">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-center">
                BearCubs
              </h1>
              <Image
                src="/gummy-bear.png"
                alt="Bearcubs Logo"
                width={100}
                height={100}
                className="w-[64px] md:w-[100px] h-[64px] md:h-[100px]"
              />
            </div>
            {/* Small tagline text */}
            <p className="text-center text-sm md:text-base text-muted-foreground italic leading-tight">
              A small but mighty benchmark for computer-using web agents
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-start md:justify-center gap-2 md:gap-4">
            <Button asChild>
              <Link href="">Paper</Link>
            </Button>
            <Button asChild>
              <Link href="/BearCubs_20250310.jsonl" download>Download questions</Link>
            </Button>
            <Button>
              <Link href="">Submit a question</Link>
            </Button>
            <Button>
              <Link href="">Evaluate your agent</Link>
            </Button>
            <Button asChild>
              <Link href="mailto:bearcubsteam@gmail.com">Contact us</Link>
            </Button>
          </div>
        </header>
        <Separator />
        <p className="text-md text-muted-foreground">Modern web agents possess <em>computer use</em> abilities 
          that allow them to interact with webpages by sending commands to a virtual keyboard and mouse. 
          While such agents have considerable potential to assist human users with complex tasks, evaluating 
          their capabilities in real-world settings poses a major challenge. To this end, we introduce BearCubs, 
          a “small but mighty” benchmark of 111 information-seeking questions designed to evaluate a web agent’s 
          ability to search, browse, and identify factual information from the web. Unlike prior web agent benchmarks, 
          solving BearCubs requires (1) accessing <em>live</em> web content rather than synthetic or simulated pages, 
          which captures the unpredictability of real-world web interactions; and (2) performing a broad range of <em>multimodal</em> interactions
          (e.g., video understanding, 3D navigation) that cannot be bypassed via text-based
          workarounds. Each question in BearCubs has a corresponding short, unambiguous answer and a human-validated browsing 
          trajectory, allowing for transparent evaluation of agent performance and strategies. A human study confirms that 
          questions are solvable but non-trivial (<strong>84.7%</strong> human accuracy), revealing search inefficiencies and
          domain knowledge gaps as common failure points. By contrast, state-of-the-art computer-using agents underperform, with 
          the best-scoring system (OpenAI’s Operator) reaching only <strong>24.3%</strong> accuracy. These results highlight 
          critical areas for improvement, including reliable source selection and more powerful multimodal capabilities.
          To facilitate future research, BearCubs will be updated periodically to replace invalid or contaminated questions, 
          keeping the benchmark fresh for future generations of web agents.</p>
        <DataTable columns={columns} data={parsedData} />
        <div className="w-full flex flex-col items-center justify-center gap-4">
          <h2 className="text-3xl font-bold">Example Question</h2>
          <Card className="p-4 w-max-w-[620px] flex flex-col items-center justify-center">
            <CardContent className="max-w-[620px]">
              <p className="text-lg text-muted-foreground">
                In the virtual tour of the Museo de Ciencias Naturales de La
                Plata, Buenos Aires, Argentina, how many columns are visible on
                the entrance floor in the Hall area?
              </p>
            </CardContent>
          </Card>
        </div>
        <CollapsibleSection
          className="w-full flex flex-col items-center justify-center gap-4"
          triggerComponent={
            <Button variant="ghost" className="p-6 text-3xl font-bold" asChild>
              <h2>Team</h2>
            </Button>
          }
        >
          <div className="flex flex-row gap-4 p-4">
            <div className="flex flex-col items-center justify-center gap-4">
              <Avatar className="w-48 h-48">
                <AvatarImage src="/ysong.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="text-lg font-bold">Yixiao Song</p>
            </div>
          </div>
          <div className="flex flex-row gap-4 p-4">
            <div className="flex flex-col items-center justify-center gap-4">
              <Avatar className="w-48 h-48">
                <AvatarImage src="/kthai.jpg" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="text-lg font-bold">Katherine Thai</p>
            </div>
          </div>
          <div className="flex flex-row gap-4 p-4">
            <div className="flex flex-col items-center justify-center gap-4">
              <Avatar className="w-48 h-48">
                <AvatarImage src="/cpham.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="text-lg font-bold">Chau Minh Pham</p>
            </div>
          </div>
          <div className="flex flex-row gap-4 p-4">
            <div className="flex flex-col items-center justify-center gap-4">
              <Avatar className="w-48 h-48">
                <AvatarImage src="/ychang.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="text-lg font-bold">Yapei Chang</p>
            </div>
          </div>          
          <div className="flex flex-row gap-4 p-4">
            <div className="flex flex-col items-center justify-center gap-4">
              <Avatar className="w-48 h-48">
                <AvatarImage src="/mnadaf.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="text-lg font-bold">Mazin Nadaf</p>
            </div>
          </div>
          <div className="flex flex-row gap-4 p-4">
            <div className="flex flex-col items-center justify-center gap-4">
              <Avatar className="w-48 h-48">
                <AvatarImage src="/miyyer.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="text-lg font-bold">Mohit Iyyer</p>
            </div>
          </div>

        </CollapsibleSection>
      </div>
    </div>
  );
}
