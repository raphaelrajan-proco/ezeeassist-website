"use client";

import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';

export function SnitcherEvents() {
  const pathname = usePathname();

  const visitRatio = 0.5;

  useEffect(() => {
    const visitObserver = new window.IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.intersectionRatio < visitRatio) {
            continue;
          }

          const element = entry.target;
          if (element.hasAttribute('data-visit')) {
            continue;
          }

          element.setAttribute('data-visit', String(entry.time));

          const eventInfo: Record<string, any> = {
            url: document.URL,
          };
          for (const attr of element.attributes) {
            if (attr.name === 'id') eventInfo['id'] = attr.value;

            if (!attr.name.startsWith('data-')) continue;
            eventInfo[attr.name.replace(/^data-/, '')] = attr.value;
          }

          console.log(entry, entry.intersectionRatio, eventInfo);
          const eventName = (
            eventInfo['id']
              ? `Viewed ${eventInfo['id']}`
              : 'Element Viewed'
          );
          window.Snitcher?.track(eventName, eventInfo);
        }
      },
      {
        threshold: visitRatio,
      }
    );

    setTimeout(() => {
      console.log('Page changed');
      for (const section of document.getElementsByTagName("section")) {
        visitObserver.observe(section)
      }
    }, 500);
  }, [pathname]);

  return null;
}
