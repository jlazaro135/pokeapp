import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { PokeListService } from './poke-list.service';
import {
  CustomPokemon,
  PokeListResponse,
  PokeListTransformed,
} from '../../../interfaces';

describe('PokeListService', () => {
  let pokeListService: PokeListService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
    }).compileComponents();
    pokeListService = TestBed.inject(PokeListService);
  });

  it('should create', () => {
    expect(pokeListService).toBeTruthy();
  });

  it('updateResultWithImage should return result with image', () => {
    // Arrange
    const response: PokeListResponse = {
      count: 2,
      next: null,
      previous: null,
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
      ],
    };

    // Act
    const updatedResponse: PokeListTransformed =
      pokeListService.updateResultWithImage(response);

    // Assert
    expect(updatedResponse).toBeDefined();
    expect(updatedResponse.results.length).toBe(2);

    // Check individual results
    const bulbasaur: CustomPokemon = updatedResponse.results[0];
    expect(bulbasaur.name).toBe('bulbasaur');
    expect(bulbasaur.id).toBe('1');
    expect(bulbasaur.image).toBe(
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png'
    );
    expect(bulbasaur.formattedName).toBe('bulbasaur');

    const charmander: CustomPokemon = updatedResponse.results[1];
    expect(charmander.name).toBe('charmander');
    expect(charmander.id).toBe('4');
    expect(charmander.image).toBe(
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png'
    );
    expect(charmander.formattedName).toBe('charmander');
  });

  it('calculateTotalPages should return total pages', () => {
    // Arrange
    const totalItems = 1000;
    const itemPerPage = 20;

    // Act
    const pages = pokeListService.calculateTotalPages(totalItems, itemPerPage);

    // Assert
    expect(pages).toBe(50);
  });

  it('getItemsPerPage should get items per page', () => {
    // Arrange
    const pokemons: CustomPokemon[] = [
      {
        name: 'pikachu',
        formattedName: 'pikachu',
        url: 'url',
        image: 'image',
        id: '1',
      },
      {
        name: 'bulbasaur',
        formattedName: 'bulbasaur',
        url: 'url',
        image: 'image',
        id: '2',
      },
      {
        name: 'bulbasaur',
        formattedName: 'bulbasaur',
        url: 'url',
        image: 'image',
        id: '2',
      },
      {
        name: 'bulbasaur',
        formattedName: 'bulbasaur',
        url: 'url',
        image: 'image',
        id: '2',
      },
      {
        name: 'bulbasaur',
        formattedName: 'bulbasaur',
        url: 'url',
        image: 'image',
        id: '2',
      },
    ];

    pokeListService.startItem = 1;
    pokeListService.endItem = 4;

    // Act

    const itemsToShow = pokeListService.getItemsPerPage(pokemons);

    // Assert

    expect(itemsToShow.length).toBe(3);
    expect(itemsToShow[0].name).toBe('bulbasaur');
  });

  it('resetPagination should reset pagination correctly', () => {
    // Arrange
    const totalItems = 20;
    const expectedPages = 2;

    // Act
    pokeListService.resetPagination(totalItems);

    // Assert
    expect(pokeListService.startItem).toBe(0);
    expect(pokeListService.endItem).toBe(
      pokeListService.pagination().itemsPerPage
    );

    const pagination = pokeListService.pagination();
    expect(pagination.pageNumber).toBe(1);
    expect(pagination.isFirstPage).toBe(true);
    expect(pagination.isLastPage).toBe(false);
    expect(pagination.items).toBe(totalItems);
    expect(pagination.pages).toBe(expectedPages);
  });

  it('should update pagination correctly for next action', () => {
    // Arrange
    pokeListService.pagination.update(() => ({
      isFirstPage: true,
      isLastPage: false,
      itemsPerPage: 20,
      pageNumber: 1,
      items: 10,
      pages: 2,
    }));

    // Act
    pokeListService.updatePagination('next');

    // Assert
    expect(pokeListService.pagination().pageNumber).toBe(2);
  });

  it('should update pagination correctly for previous action', () => {
    // Arrange
    pokeListService.pagination.update(() => ({
      isFirstPage: true,
      isLastPage: false,
      itemsPerPage: 20,
      pageNumber: 2,
      items: 10,
      pages: 2,
    }));

    // Act
    pokeListService.updatePagination('previous');

    // Assert
    expect(pokeListService.pagination().pageNumber).toBe(1);
  });

  it('checkPageEdge should update pagination buttons when is last page', () => {
    // Arrange
    pokeListService.pagination.update(() => ({
      isFirstPage: false,
      isLastPage: true,
      itemsPerPage: 20,
      pageNumber: 2,
      items: 10,
      pages: 2,
    }));

    // Act
    pokeListService.checkPageEdge('next');

    // Assert
    expect(pokeListService.pagination().isLastPage).toBe(true);
  });

  it('checkPageEdge should update pagination buttons when is first page', () => {
    // Arrange
    pokeListService.pagination.update(() => ({
      isFirstPage: false,
      isLastPage: true,
      itemsPerPage: 20,
      pageNumber: 2,
      items: 10,
      pages: 2,
    }));

    pokeListService.startItem = 0;

    // Act
    pokeListService.checkPageEdge('previous');

    // Assert
    expect(pokeListService.pagination().isFirstPage).toBe(true);
  });

  it('updateItems should update items correctly for next action', () => {
    // Arrange
    pokeListService.startItem = 0;
    pokeListService.endItem = 10;

    // Act
    pokeListService.updateItems('next');

    // Assert
    expect(pokeListService.startItem).toBe(10);
    expect(pokeListService.endItem).toBe(20);
  });

  it('updateItems should update items correctly for previous action', () => {
    // Arrange
    pokeListService.startItem = 10;
    pokeListService.endItem = 20;

    // Act
    pokeListService.updateItems('previous');

    // Assert
    expect(pokeListService.startItem).toBe(0);
    expect(pokeListService.endItem).toBe(10);
  });

});
