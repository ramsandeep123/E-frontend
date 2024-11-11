import Link from 'next/link';
import { Icons } from '../Icons';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '../ui/NavigationMenu';
import { ListItem } from './ListItem';

const DesktopNav = () => {
  return (
    <div className='hidden lg:flex gap-x-8 items-center'>
      <Link href='/' className='flex space-x-2'>
        <Icons.logo className='h-6 w-6' aria-hidden='true' />
        <span className='hidden font-bold lg:inline-block'>UrbanNest</span>
        <span className='sr-only'>Home</span>
      </Link>
      <NavigationMenu>
        <NavigationMenuList>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className='grid w-[400px] gap-3 p-6 md:w-[500px] md:grid-cols-2'>
                <ListItem href='/products?category=cosemetics' title='Cosemetics'>
                  Explore the cosemetics category
                </ListItem>
                <ListItem href='/products?category=clothing' title='Clothing'>
                  Explore the clothing category
                </ListItem>
                <ListItem href='/products?category=accessories' title='Accessories'>
                  Explore the accessories category
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default DesktopNav;
