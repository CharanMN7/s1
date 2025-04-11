import React from "react";
import data from "./data.json";
import S1BaseLayout from "../s1-base-layout";
import { Day } from "@/components/day";

const Page: React.FC = () => {
  return (
    <S1BaseLayout>
      <section className=" border-b border-dashed flex justify-center">
        <div className="p-4 flex gap-4 flex-col">
          <h2 className="text-5xl font-extrabold text-center m-4">
            here&apos;s the plan
          </h2>
          <div className=" border-t border-dashed max-w-screen-sm">
            {data.data.map((item, index) => {
              return (
                <Day
                  dayNum={item.dayNum}
                  title={item.title}
                  content={item.content}
                  key={index}
                  i={index}
                />
              );
            })}
          </div>
          <div className="flex justify-center items-baseline">
            <p className="text-center m-1">
              <span className="text-muted-foreground text-sm">
                baymax fan art by{" "}
              </span>{" "}
              sadiya
            </p>
          </div>
        </div>
      </section>
    </S1BaseLayout>
  );
};

export default Page;
